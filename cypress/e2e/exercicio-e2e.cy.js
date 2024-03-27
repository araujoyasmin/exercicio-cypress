/// <reference types="cypress" />
import produtosPage from "../support/page_objects/produtos.page";

context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
    /*  Como cliente 
        Quero acessar a Loja EBAC 
        Para fazer um pedido de 4 produtos 
        Fazendo a escolha dos produtos
        Adicionando ao carrinho
        Preenchendo todas opções no checkout
        E validando minha compra ao final */

    beforeEach(() => {
        cy.visit('/minha-conta')
        cy.fixture('perfil').then( login => {
            cy.login(login.usuario, login.senha)
        })
    });

    it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {

        // ir para tela inicial
        cy.inicial()

        cy.fixture('produtos').then(dados => {
            produtosPage.buscarProduto() // selecionar primeiro produto
            produtosPage.addProdutoCarrinho(dados[0].tamanho, dados[0].cor, dados[0].quantidade) // add no carrinho

            cy.get('.woocommerce-message').should('contain', dados[0].nomeProduto) // validar
        })

        cy.fixture('produtos').then(dados => {
            produtosPage.buscarProdutoPorNome('Eos V-Neck Hoodie') // selecionar segundo produto buscando por nome
            produtosPage.addProdutoCarrinho(dados[2].tamanho, dados[2].cor, dados[2].quantidade) // add no carrinho

            cy.get('.woocommerce-message').should('contain', dados[2].nomeProduto) // validar
        })

        // selecionar produto 3
        cy.inicial()
        cy.fixture('produtos').then(dados => {
            produtosPage.buscarProduto(4) // selecionar produto na posicao 4
            produtosPage.verificarWish(dados[3].tamanho, dados[3].cor, dados[3].quantidade) // add no carrinho
        })
        
        //selecione produto 4
        cy.inicial()
        cy.fixture('produtos').then(dados => {
            produtosPage.buscarProduto(6) // selecionar produto na posicao 7
            produtosPage.addProdutoCarrinho(dados[4].tamanho, dados[4].cor, dados[4].quantidade) // add no carrinho
        })

        //ir pro carrinho
        cy.carrinho()

        //concluir compra
        cy.concluir()

        cy.fixture('perfil').then(dados => {
            produtosPage.completarCheckout(dados)
            cy.get('.woocommerce-notice').should('contain', 'Seu pedido foi recebido.')
        })
       

    });


})

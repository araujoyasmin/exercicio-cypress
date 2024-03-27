class ProdutosPage {

    buscarProduto(posicao){
        if(posicao){
            cy.get('.product-block').eq(posicao).click()
        }else{
            cy.get('.product-block').first().click()
        }
       
    }

    addProdutoCarrinho(tamanho, cor, quantidade){
        cy.get('.button-variable-item-'+tamanho).click()
        cy.get('.button-variable-item-'+cor).click()
        cy.get('.input-text').clear().type(quantidade)
        cy.get('.single_add_to_cart_button').click()
    }

    buscarProdutoPorNome(nome){
        cy.get('[name="s"]').eq(1).type(nome)
        cy.get('.search > .tbay-search-form > .form-ajax-search > .form-group > .input-group > .button-group > .button-search').click()
        cy.get('.product_title').should('contain', nome)
    }

    verificarWish(tamanho, cor, quantidade){
        cy.get('body').then($body => {
            // Verifica se o primeiro botão existe
            const $button = $body.find('.yith-wcwl-wishlistexistsbrowse > a');
            if ($button.length > 0) { // selecionar se ja existe na wish
                cy.get('.yith-wcwl-wishlistexistsbrowse > a').click()


                // selecionar item da wish
                cy.get('#yith-wcwl-row-4028 > .product-name').eq(0).click()

                this.addProdutoCarrinho(tamanho, cor, quantidade)

              
            } else { // add na wish e depois ir na wish pra add no carrinho
                cy.get('.add_to_wishlist > :nth-child(2) > span').click()
                cy.get('.yith-wcwl-wishlistexistsbrowse > a').click()

                //seleciona
                cy.get('#yith-wcwl-row-4028 > .product-name').eq(0).click()

                //add no carrinho
                this.addProdutoCarrinho(tamanho, cor, quantidade)
                
            }
        });
    }

    completarCheckout(dados){
        cy.get('#billing_first_name').clear().type(dados.nome)
        cy.get('#billing_last_name').clear().type(dados.sobrenome)
        cy.get('#billing_company').clear()
        cy.get('#billing_address_1').clear().type(dados.endereco)
        cy.get('#billing_city').clear().type(dados.cidade)
        cy.get('#billing_phone').clear().type(dados.telefone)
        cy.get('#billing_email').clear().type(dados.usuario)

        cy.get('#terms').check()
        cy.get('#place_order').click()

    }

}

export default new ProdutosPage()
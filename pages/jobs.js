import {Component, Fragment} from 'react'
import Head from 'next/head'
import TextContainer from 'components/shared/TextContainer'

class Jobs extends Component {
  render() {
    return (
      <Fragment>
        <Head>
          <title>Trabalhe conosco | EmCasa</title>
          <meta
            name="description"
            content="Procuramos desenvolvedores excepcionais em Elixir e React / React Native. Cadastre-se!"
          />
          <meta
            property="og:description"
            content="Procuramos desenvolvedores excepcionais em Elixir e React / React Native. Cadastre-se!"
          />
          <meta
            property="og:image"
            content="https://res.cloudinary.com/emcasa/image/upload/f_auto/v1513818385/home-2018-04-03_cozxd9.jpg"
          />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Trabalhe conosco | EmCasa" />
          <meta
            name="twitter:description"
            content="Procuramos desenvolvedores excepcionais em Elixir e React / React Native. Cadastre-se!"
          />
          <meta
            name="twitter:image"
            content="https://res.cloudinary.com/emcasa/image/upload/f_auto/v1513818385/home-2018-04-03_cozxd9.jpg"
          />
        </Head>

        <TextContainer>
          <h1>Trabalhe EmCasa (ou onde quiser)</h1>

          <p>
            Criamos a EmCasa para melhorar a vida de quem está comprando e
            vendendo imóveis residenciais. Proporcionar mais qualidade,
            quantidade e velocidade de informação.
          </p>

          <p>
            Já teve aqueles 20 minutos à toa naquele bairro que você sempre
            gostou e até sonhou morar? Imagine poder abrir um aplicativo e
            descobrir que num raio de 30 metros de você existem apartamentos à
            venda. Com um swipe, abrir a porta do apartamento e poder vê-lo por
            dentro, sem depender de ninguém, sem esperar.
          </p>

          <p>
            Nossa visão é proporcionar esse nível de experiência aos clientes
            EmCasa. Usar tecnologia para que todo o processo de compra, da busca
            do imóvel à entrega da chave, seja muito superior ao que existe
            hoje.
          </p>

          <p>
            Para chegarmos lá, estamos buscando desenvolvedores excepcionais.
          </p>

          <br />

          <h5>A EQUIPE</h5>

          <p>
            Trabalharemos com uma equipe de desenvolvimento distribuída. Todas
            as habilidades necessárias para colaborar remotamente vão ser
            indispensáveis para nós também: disciplina, independência,
            iniciativa, comunicação.
          </p>

          <p>
            Estamos buscando pessoas com perfil de potenciais sócios da EmCasa,
            e ofereceremos equity para quem mostrar que deseja fazer parte do
            time a longo prazo.
          </p>

          <br />

          <h2>UX/UI Designer</h2>
          <h4>Remoto</h4>

          <p>
            O designer irá focar na experiência do usuário para trabalhar com nossas equipes de
            marketing, produto e desenvolvimento na prototipagem de interfaces do produto, criação de
            landing pages e ilustrações para campanhas online e offline.
          </p>

          <a
            href="https://www.linkedin.com/jobs/view/758970535/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn"
          >
            Cadastre-se
          </a>

          <br />
          <br />
          <br />

          <h2>Engenheiro Backend Elixir / Phoenix</h2>
          <h4>Remoto</h4>

          <p>
            O backend vai servir clientes web e mobile. Nosso objetivo é
            oferecer uma busca ágil e geolocalização. Experiência com ambas é um
            diferencial. Saber escrever código bem documentado e com testes é
            fundamental.
          </p>

          <a
            href="https://docs.google.com/forms/d/1erD-GRBj629pKcFHpmwYOLz4OYbEHy8Mu5VB_o37EiM/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn"
          >
            Cadastre-se
          </a>

          <br />
          <br />
          <br />

          <h2>Engenheiro JS / React / React Native</h2>
          <h4>Remoto</h4>

          <p>
            Desenvolvedor React ou React Native. Se for bom em ambos é um grande
            diferencial. Familiaridade com APIs do Google Maps é outro plus.
            Saber escrever código bem documentado e com testes é fundamental.
          </p>

          <a
            href="https://docs.google.com/forms/d/1FIoJIqPfMLbh9qVj8ODJUNK08_yX_DbfhrRtF9oOWwA"
            target="_blank"
            rel="noopener noreferrer"
            className="btn"
          >
            Cadastre-se
          </a>
        </TextContainer>
      </Fragment>
    )
  }
}

export default Jobs

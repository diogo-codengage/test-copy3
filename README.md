# [Sanar](https://www.editorasanar.com.br/)

Este projeto foi desenvolvido para que seja atendido de forma ampla, eficiênte e produtiva todas as necessidades das diversas plataformas pertencentes à [**Editora Sanar**](https://www.editorasanar.com.br/).

- [SANAR](#) - [Instalação](#instalacao); - [Execução](#execucao); - [Estrutura](#estrutura); - [Construção](#construcao); - [Observações](#observações); - [Bibliotecas utilizadas](#bibliotecas-utilizadas); - [Padrões utilizadas](#padrões-utilizadas); - [Dicas e recomendações](#dicas-e-recomendações);
- [Sanar UI](#sanar-ui)

---

## Instalação

Apesar de estar sendo executado na raíz da aplicação, este comando instalará também as dependências nos submódulos da aplicação (**/packages**):

`$ yarn`

## Execução

Para a execução dos submódulos o arquivo `package.json` terá em sua seção de `scripts` uma referência para cada _script_ relacionado aos submódulos.

**Exemplo:** `$ yarn app1:start` ou `$ yarn app1:build`.

> Ao ser adicionada nova aplicação e/ou biblioteca será necessária a adição de um script referenciando seus comandos.

```
//sanar/package.json
"scripts": {
	"newapp:start": "yarn workspace newapp start"
}
```

## Estrutura (Monorepo)

Como citado, a Editora Sanar possui diversas plataformas - que seguem o mesmo padrão visual - com diversos conteúdos distintos. Avaliando esta necessidade, fora optado pela utilização de um **Monorepo** baseado na seguinte estrutura:

```
//sanar
	/packages
		/app1
			package.json
		/lib1
			package.json
		...
	package.json
```

### Construção

Nesta estrutura fora utilizado o [Yarn Workspaces](https://yarnpkg.com/lang/en/docs/workspaces/) para o gerenciamento de todas as dependências e submódulos. Logo, estas sendo em comum entre os demais projetos, ela deverá ser adicionada ao `package.json` na raíz da aplicação. Caso contrário, apenas na aplicação/biblioteca que necessite a utilização da mesma.

```
//sanar/packages.json
"workspaces": [
	"packages/*"
]
```

### Observações

- Em casos onde será necessária a configuração de um _build_ por meio do [Babel](https://babeljs.io/), deverá ser importada a configuração do arquivo da raíz da aplicação - como feito em `packages/sanar-ui/babel.config.js` - e alterado pontualmente as necessidades, deixando assim, a responsabilidade ao projeto `raíz`.

### Bibliotecas utilizadas

- [Ant Design](https://ant.design/)
- [Babel](https://babeljs.io/)
- [Jest](https://jestjs.io/)
- [LESS](http://lesscss.org/)
- [React](https://reactjs.org/)
- [React Testing Library](https://github.com/kentcdodds/react-testing-library)
- [Storybook](https://storybook.js.org/)
- [Yarn](https://yarnpkg.com/) - [Workspaces](https://yarnpkg.com/lang/en/docs/workspaces/)

### Padrões utilizados:

- [Atomic Design](http://bradfrost.com/blog/post/atomic-web-design/);
- [Git Flow](https://danielkummer.github.io/git-flow-cheatsheet/index.html).

### Dicas e Recomendações

- Para usuários do [Visual Studio Code](https://code.visualstudio.com/): - [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode);

---

# Sanar UI

Esta biblioteca - localizada em: `/sanar/packages/sanar-ui` - possuirá todos os elementos visuais que serão compartilhados entre as demais aplicações do ecossistema Sanar.

Para o seu desenvolvimento é utilizado os seguintes padrões e bibliotecas:

- [Ant Design](https://ant.design/);
- [Atomic Design](http://bradfrost.com/blog/post/atomic-web-design/);
- [Storybook](https://storybook.js.org/); - Todos os componentes que serão adicionados ao Storybook deverão conter a extensão `*.stories.*` para que a adição seja automática; - Deverá ser contido pela pasta a qual está categorizado dentro do padrão do Atomic Design (Atoms, Molecules, Organisms, entre outros); - Ex.: `storiesOf("Atoms.Button", module)`
- Testes ([Jest](https://jestjs.io/) | [React Testing Library](https://github.com/kentcdodds/react-testing-library)): - Cada componente terá em sua raíz a pasta `__tests__` contendo todos os arquivos de teste; - O arquivo de testes deverá seguir o padrão: `NomeComponente.test.js`; - Todo o arquivo com a extensão `*.test.*` será adicionado automaticamente à lista de testes para a execução;
- Componentes: - Terão de sempre iniciar com o prefixo `ES`; - Ex.: `ESButton`, `ESCard`; - Deverão conter a extensão `.jsx`; - Seus diferentes tipos de aplicação deverão - quando necessário a criação de outro arquivo - conter alguma referência de que pertecem para aquele ecossistema; - Ex.: `Button`, `ButtonIcon`, `Menu`, `SubMenu`;
- Estilização: - Seguirão o seguinte processo para a importação:
  `//Button/style.less //Atoms/atoms.less @import('./Button/style.less'); // Components/components.less @import('./Atoms/atoms.less')`

const { ApolloServer, gql } = require('apollo-server');

// Definição do schema
const typeDefs = gql`
  type Suggestion {
    id: ID!
    suggestion: String!
  }

  type Query {
    suggestions(term: String!): [Suggestion]
  }
`;

// Dados de exemplo
const suggestionsData = [
  { id: '1', suggestion: 'Apple' },
  { id: '2', suggestion: 'Banana' },
  { id: '3', suggestion: 'Cherry' },
  { id: '4', suggestion: 'Date' },
  { id: '5', suggestion: 'Elderberry' },
  { id: '6', suggestion: 'Labanana' },
  // Adicione mais dados conforme necessário
];

// Resolvers
const resolvers = {
  Query: {
    suggestions: (_, { term }) => {
        if(term.length < 4) {
            return [];
        }
        return suggestionsData.filter(suggestion =>
            suggestion.suggestion.toLowerCase().includes(term.toLowerCase())
        ).slice(0,20);
    },
  },
};

// Criação do servidor Apollo
const server = new ApolloServer({ typeDefs, resolvers });

// Inicialização do servidor
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

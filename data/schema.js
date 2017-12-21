
import {
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInputObjectType,
} from 'graphql';

import {
  connectionArgs,
  connectionDefinitions,
  connectionFromArray,
  fromGlobalId,
  globalIdField,
  mutationWithClientMutationId,
  nodeDefinitions,
} from 'graphql-relay';

import pool from './database';

let empty = {}

let bookType = new GraphQLObjectType({
  name: 'bookList',
  fields: () => ({
    id: {
      type: GraphQLID
    },
    title: {
       type: GraphQLString
     },
    author: {
      type: GraphQLString
    }

  })
});

let storeType = new GraphQLObjectType({
    name: 'Store',
    fields: () => ({
      books: {
      type: new GraphQLList(bookType),
      resolve: () => {
        return new Promise((resolve,reject) => {
           pool.query('SELECT * FROM Books',function(error,results,fields){
             error ? reject(error) : resolve(results);
             });
         });
       }
     }
    })
  });

  // mutation

  let orderType = new GraphQLInputObjectType({
    name: 'Orders',
    fields: () => ({
     book_id: {
          type: GraphQLInt
        },
      quantity: {
         type: GraphQLInt
       }
    })
  });

 const ordersMutationType = mutationWithClientMutationId({
    name: 'OrdersMutation',
    inputFields : {
      values : {
        type : orderType
      },
      keyIndex : {
        type : GraphQLInt
      }
    },
    outputFields : {
      ordersOutput : {
        type : GraphQLString,
        resolve : (payload) => {
            return "hello"
        }
      }

    },
    mutateAndGetPayload : ({values,keyIndex}) =>{

      console.log("aaa");
      var query = "INSERT INTO Orders (book_id,quantity,cart) VALUES (";
      values.cart = "added";
      let valuesLength = Object.keys(values).length;

       for(var j in values){

               query = query + "'"+values[j]+"'";
                valuesLength--;
               if(valuesLength>0){
                 query = query + ",";
               }
     }

      query += ")"

      console.log(query);


      pool.query(query,function(error,results,fields){
        console.log(error);
        console.log(results);
      });

    }

  });

  var queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    store: {
      type: storeType,
      resolve: () => empty
      }
    })
});

  var mutationType = new GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
    ordersmutation  :  ordersMutationType
    })
  });


 const Schema = new GraphQLSchema({
    query: queryType,
    mutation: mutationType
  })

   //mutation:

export default Schema;

/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTodo = /* GraphQL */ `
  query GetTodo($id: ID!) {
    getTodo(id: $id) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const listTodos = /* GraphQL */ `
  query ListTodos(
    $filter: ModelTodoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTodos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getProfile = /* GraphQL */ `
  query GetProfile($id: ID!) {
    getProfile(id: $id) {
      id
      name
      detail {
        resignprediction
        service
        cost
      }
      tw
      ci
      js
      pl
      result
      performance {
        topic
        value
      }
      esdata
      eltvdata {
        data
        labels
      }
      iqeq
      eltv
      iq
      description
      eq
      type
      typeimgurl
      imgurl
      predictionscore
      mbti {
        teamchart
        deptchart
        total
        type
        chart
        before
        after
      }
      total_score
      mbtigraph
      matching
      actualeltv
      lifeyear
      growthrate
      discountrate
      createdAt
      updatedAt
    }
  }
`;
export const listProfiles = /* GraphQL */ `
  query ListProfiles(
    $filter: ModelProfileFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProfiles(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        detail {
          resignprediction
          service
          cost
        }
        tw
        ci
        js
        pl
        result
        performance {
          topic
          value
        }
        esdata
        eltvdata {
          data
          labels
        }
        iqeq
        eltv
        iq
        description
        eq
        type
        typeimgurl
        imgurl
        predictionscore
        mbti {
          teamchart
          deptchart
          total
          type
          chart
          before
          after
        }
        total_score
        mbtigraph
        matching
        actualeltv
        lifeyear
        growthrate
        discountrate
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;

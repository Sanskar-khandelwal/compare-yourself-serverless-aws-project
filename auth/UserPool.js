import {CognitoUserPool, CognitoUserAttribute, CognitoUser} from "amazon-cognito-identity-js"
const POOL_DATA = {
    UserPoolId: "eu-north-1_H99nvkneh",
    ClientId: "7ndrke6s5ibtlks21d65u2mpdb"
  }
  

const UserPool = new CognitoUserPool(POOL_DATA)

export default UserPool;
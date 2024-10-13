import { use } from "react";
import conf from "../conf/conf.js"

import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);

    }

    async createAccount({email,password,name}){
        try {
            const userAccount = await this.account.create(ID.unique(),email,password,name);
            if(userAccount){
                //Calling login method 
                return this.login({email,password})
            }else{
                return userAccount
            }
        } catch (error) {
            throw error
        }
        
    }
    async login({email,password}) {
        try {
            return await this.account.createEmailPasswordSession(email,password)
        } catch (error) {
            throw error;
        }
        
    }


}

const authService = new AuthService()

export default authService
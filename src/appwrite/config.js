import conf from "../conf/conf.js"
import {Client,Databases,ID,Storage,Query} from "appwrite"


export class Service{

    client = new Client();
    bucket;
    databases;

    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({title,slug,content,featuredImage,status,userId}) {
        try {
            await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
        } catch (error) {
            console.log("Appwrite Service :: createPost :: error",error)
        }
    }
    async updatePost(slug,{title,content,featuredImage,status}) {
        try {
            await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    
                }
            )
        } catch (error) {
            console.log("Appwrite Service :: updatePost :: error",error)
        }        
    }
    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true
        } catch (error) {
            console.log("Appwrite Service :: deletePost :: error",error)   
            return false
        }
    }
    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log("Appwrite Service :: getPost :: Error",error)   
            return false
        }

    }
    async getPosts(queries = [Query.equal("status","active")]){
        try {
            await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            )
        } catch (error) {
            console.log("Appwrite Service :: getPosts :: Error",error)
            return false
        }
    }
}

const service = new Service()
export default service
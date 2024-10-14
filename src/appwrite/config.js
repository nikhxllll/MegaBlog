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
}

const service = new Service()
export default service
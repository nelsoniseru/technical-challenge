module.exports = {
    create_subscription: {
        post: {
            tags: ['Subscribe'],
            summary: 'Subscribe to newsletter',
            produces: ['application/json'],
            consumes: ['application/json'],
            requestBody: {
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                email:{
                                    type: 'string',
                                    required:true,
                                 
                                },
                                firstname:{
                                    type: 'string'
                                    
                                },
                                gender:{
                                    type: 'string'
                                
                                },
                                date_of_birth:{
                                    type:'string',
                                    required:true
                                },
                                newsletter_id:{
                                    type: 'string',
                                    required:true
                                },
                                flag_for_content:{
                                    type: 'boolean',
                                    required:true,
                                  
                                },
                            },
                            required: ['email', 'date_of_birth', 'newsletter_id','flag_for_content']
                            
                        }
                    }
                }
            },

            security: [{ bearerAuth: [] }],
            responses: {}
         
        }
    },
    cancelSub: {
        delete: {
            tags: ['Subscribe'],
            summary: 'Cancel subscription',      
            requestBody: {
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                email:{
                                    type: 'string',
                                    required:true,
                                 
                                }
                            },
                            required: ['email']
                        }
                    }
                }
            },

            security: [{ bearerAuth: [] }],
            responses: {}
        },
       
      

       
    },
    get_subscription:{
        get: {
            tags: ['Subscribe'],
            summary: 'Get an existing subscription',
            produces: ['application/json'],
            parameters: [
                {
                    in: 'path',
                    name: 'subcriptionid',
                    required: true,
                    type: 'string'
                }
            ],

            security: [{ bearerAuth: [] }],
            responses: {}
        }
        },
       
        get_all_subscription: {
            get: {
                tags: ['Subscribe'],
                summary: 'Get the list of all subscription',
                produces: ['application/json'],
    
                
                security: [{ bearerAuth: [] }],
                responses: {}
            },
        }
};

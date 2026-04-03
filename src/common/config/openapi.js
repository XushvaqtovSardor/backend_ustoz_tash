export const openApiDocument = {
    openapi: "3.0.3",
    info: {
        title: "Backend Ustoz Tash API",
        version: "1.0.0",
        description: "Express API documentation",
    },
    servers: [
        {
            url: "https://backend-ustoz-tash.onrender.com",
            description: "Render",
        },
    ],
    tags: [
        { name: "Auth" },
        { name: "Users" },
        { name: "Files" },
    ],
    paths: {
        "/api/register": {
            post: {
                tags: ["Auth"],
                summary: "Register user",
                requestBody: {
                    required: true,
                    content: {
                        "multipart/form-data": {
                            schema: {
                                type: "object",
                                required: ["username", "email", "password", "file"],
                                properties: {
                                    username: { type: "string", example: "john11" },
                                    email: { type: "string", example: "john@mail.com" },
                                    password: { type: "string", example: "123456" },
                                    file: { type: "string", format: "binary" },
                                },
                            },
                        },
                    },
                },
                responses: {
                    "200": { description: "Success" },
                    "400": { description: "Validation error" },
                },
            },
        },
        "/api/login": {
            post: {
                tags: ["Auth"],
                summary: "Login user",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                required: ["username", "password"],
                                properties: {
                                    username: { type: "string", example: "john11" },
                                    password: { type: "string", example: "123456" },
                                },
                            },
                        },
                    },
                },
                responses: {
                    "200": { description: "Success" },
                    "401": { description: "Unauthorized" },
                },
            },
        },
        "/api/users": {
            get: {
                tags: ["Users"],
                summary: "Get all users",
                responses: {
                    "200": { description: "Success" },
                },
            },
        },
        "/api/files": {
            post: {
                tags: ["Files"],
                summary: "Create file",
                requestBody: {
                    required: true,
                    content: {
                        "multipart/form-data": {
                            schema: {
                                type: "object",
                                required: ["title", "userId", "file"],
                                properties: {
                                    title: { type: "string", example: "lesson-1" },
                                    userId: { type: "number", example: 1 },
                                    file: { type: "string", format: "binary" },
                                },
                            },
                        },
                    },
                },
                responses: {
                    "200": { description: "Success" },
                },
            },
            put: {
                tags: ["Files"],
                summary: "Update file title",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                required: ["title", "fileId", "userId"],
                                properties: {
                                    title: { type: "string", example: "new-title" },
                                    fileId: { type: "number", example: 1 },
                                    userId: { type: "number", example: 1 },
                                },
                            },
                        },
                    },
                },
                responses: {
                    "200": { description: "Success" },
                },
            },
            delete: {
                tags: ["Files"],
                summary: "Delete file",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                required: ["fileId", "userId"],
                                properties: {
                                    fileId: { type: "number", example: 1 },
                                    userId: { type: "number", example: 1 },
                                },
                            },
                        },
                    },
                },
                responses: {
                    "200": { description: "Success" },
                },
            },
        },
        "/api/files/all": {
            get: {
                tags: ["Files"],
                summary: "Get all files",
                responses: {
                    "200": { description: "Success" },
                },
            },
        },
        "/api/files/oneUser/{userId}": {
            get: {
                tags: ["Files"],
                summary: "Get files by user",
                parameters: [
                    {
                        name: "userId",
                        in: "path",
                        required: true,
                        schema: { type: "string" },
                    },
                ],
                responses: {
                    "200": { description: "Success" },
                },
            },
        },
        "/api/file/download/{file_name}": {
            get: {
                tags: ["Files"],
                summary: "Download file",
                parameters: [
                    {
                        name: "file_name",
                        in: "path",
                        required: true,
                        schema: { type: "string" },
                    },
                ],
                responses: {
                    "200": { description: "Success" },
                },
            },
        },
    },
};

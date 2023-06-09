export const getContent = {
	"tags": ["Content"],
	"summary":
		"Returns content on Content List table depending on parameters, if no parameters return all content.",
	"produces": ["application/json"],
	"parameters": [
		{
			"in": "url",
			"name": "id",
			"description": "Content ID",
			"required": false,
			"schema": {
				"type": "string"
			}
		},
		{
			"in": "url",
			"name": "name",
			"description": "Content Name",
			"required": false,
			"schema": {
				"type": "string"
			}
		},
		{
			"in": "url",
			"name": "status",
			"description": "Content Status",
			"required": false,
			"schema": {
				"type": "string"
			}
		},
		{
			"in": "url",
			"name": "type",
			"description": "Content Type",
			"required": false,
			"schema": {
				"type": "string"
			}
		}
	],
	"description":
		"Returns content on Content List table depending on parameters, if no parameters return all content.",
	"operationId": "getContent",
	"responses": {
		"200": {
			"description": "A list of content.",
			"content": {
				"application/json": {
					"schema": {
						"type": "array",
						"items": {
							"id": {
								"type": "string",
								"description": "Content Id"
							},
							"name": {
								"type": "string",
								"description": "Content name"
							},
							"content_status": {
								"type": "string",
								"description": "Content status id"
							},
							"content_type": {
								"type": "string",
								"description": "Content type id"
							},
							"global_rating": {
								"type": "number",
								"description": "Content global rating"
							},
							"personal_rating": {
								"type": "number",
								"description": "Content personal rating"
							},
							"genres": {
								"type": "array",
								"description": "Content genres list"
							},
							"images": {
								"type": "string",
								"description": "Content images"
							},
							"creation_timestamp": {
								"type": "date timestamp",
								"description": "Record creation timestamp"
							},
							"record_timestamp": {
								"type": "date timestamp",
								"description": "Record update timestamp"
							}
						}
					}
				}
			}
		},
		"400": {
			"description": "Error"
		}
	}
}

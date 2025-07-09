# E-commerce API Design

## Base URL
```
https://api.yourstore.com/v1
```

## Authentication
- JWT Bearer tokens for authenticated endpoints
- Public endpoints for product browsing
- Admin endpoints for product management

## Response Format
```json
{
  "success": true,
  "data": {}, // or []
  "message": "Success message",
  "pagination": { // for paginated responses
    "page": 1,
    "limit": 20,
    "total": 100,
    "totalPages": 5
  }
}
```

## Error Response Format
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "details": []
  }
}
```

---

## 1. Authentication & User Management

### Register User
```http
POST /auth/register
Content-Type: application/json
```
Request Format
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

### Login
```http
POST /auth/login
Content-Type: application/json

```
Request Format
```json
{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

### Get Current User
```http
GET /auth/me
Authorization: Bearer <token>
```

### Update User Profile
```http
PUT /auth/profile
Authorization: Bearer <token>
Content-Type: application/json
```
Request Format
```json
{
  "name": "John Updated",
  "email": "john.updated@example.com"
}
```

### Change Password
```http
POST /auth/change-password
Authorization: Bearer <token>
Content-Type: application/json
```
Request Format
```json
{
  "currentPassword": "oldpassword",
  "newPassword": "newpassword123"
}
```

---

## 2. Product Management

### [x] Get All Products
```http
GET /products?page=1&limit=20&search=shirt&vendor=nike&productType=clothing&tags=summer,casual&sortBy=price&sortOrder=asc
```

### [x] Get Single Product
```http
GET /products/{handle}
```

### Create Product (Admin)
```http
POST /products
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "title": "Cool T-Shirt",
  "handle": "cool-t-shirt",
  "vendor": "Nike",
  "body_html": "<p>Amazing t-shirt</p>",
  "productType": "clothing",
  "tags": ["summer", "casual"],
  "variants": [
    {
      "title": "Small / Red",
      "option1": "Small",
      "option2": "Red",
      "price": 29.99,
      "compareAtPrice": 39.99,
      "available": true,
      "position": 1
    }
  ],
  "options": [
    {
      "name": "Size",
      "position": 1,
      "values": ["Small", "Medium", "Large"]
    },
    {
      "name": "Color",
      "position": 2,
      "values": ["Red", "Blue", "Green"]
    }
  ],
  "images": [
    {
      "src": "https://example.com/image1.jpg",
      "alt": "Product image",
      "width": 800,
      "height": 600,
      "position": 1
    }
  ]
}
```

### Update Product (Admin)
```http
PUT /products/{handle}
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "title": "Updated Cool T-Shirt",
  "price": 34.99
}
```

### Delete Product (Admin)
```http
DELETE /products/{handle}
Authorization: Bearer <admin_token>
```

---

## 3. Product Variants

### Get Product Variants
```http
GET /products/{handle}/variants
```

### Get Single Variant
```http
GET /variants/{id}
```

### Create Variant (Admin)
```http
POST /products/{handle}/variants
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "title": "Medium / Blue",
  "option1": "Medium",
  "option2": "Blue",
  "price": 29.99,
  "available": true,
  "position": 2
}
```

### Update Variant (Admin)
```http
PUT /variants/{id}
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "price": 27.99,
  "available": false
}
```

### Delete Variant (Admin)
```http
DELETE /variants/{id}
Authorization: Bearer <admin_token>
```

---

## 4. Shopping Cart

### Get Cart
```http
GET /cart
Authorization: Bearer <token>
```

### Add to Cart
```http
POST /cart/items
Authorization: Bearer <token>
Content-Type: application/json

{
  "variantId": "123456789",
  "quantity": 2
}
```

### Update Cart Item
```http
PUT /cart/items/{id}
Authorization: Bearer <token>
Content-Type: application/json

{
  "quantity": 3
}
```

### Remove Cart Item
```http
DELETE /cart/items/{id}
Authorization: Bearer <token>
```

### Clear Cart
```http
DELETE /cart
Authorization: Bearer <token>
```

---

## 5. Orders

### Get User Orders
```http
GET /orders?page=1&limit=10&status=pending
Authorization: Bearer <token>
```

### Get Single Order
```http
GET /orders/{id}
Authorization: Bearer <token>
```

### Create Order (Checkout)
```http
POST /orders
Authorization: Bearer <token>
Content-Type: application/json

{
  "items": [
    {
      "variantId": "123456789",
      "quantity": 2,
      "price": 29.99
    }
  ]
}
```

### Get Order Items
```http
GET /orders/{orderId}/items
Authorization: Bearer <token>
```

---

## 6. Collections

### [x] Get All Collections
```http
GET 2
```

### [x] Get Single Collection
```http
GET /collections/{handle}
```

### [x] Get Collection Products
```http
GET /collections/{handle}/products?page=1&limit=20&sortBy=title&sortOrder=asc
```

### Create Collection (Admin)
```http
POST /collections
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "title": "Summer Collection",
  "handle": "summer-collection"
}
```

### Update Collection (Admin)
```http
PUT /collections/{handle}
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "title": "Updated Summer Collection"
}
```

### Add Product to Collection (Admin)
```http
POST /collections/{handle}/products
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "productHandle": "cool-t-shirt"
}
```

### Remove Product from Collection (Admin)
```http
DELETE /collections/{handle}/products/{productHandle}
Authorization: Bearer <admin_token>
```

---

## 7. Images

### Upload Image (Admin)
```http
POST /images
Authorization: Bearer <admin_token>
Content-Type: multipart/form-data

image: <file>
alt: "Product image"
```

### Get Image
```http
GET /images/{id}
```

### Update Image (Admin)
```http
PUT /images/{id}
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "alt": "Updated alt text",
  "position": 2
}
```

### Delete Image (Admin)
```http
DELETE /images/{id}
Authorization: Bearer <admin_token>
```

---

## 8. Search & Filtering

### Search Products
```http
GET /search/products?q=shirt&filters[vendor]=nike&filters[productType]=clothing&filters[tags]=summer&filters[priceRange]=20-50&page=1&limit=20
```

### Get Product Suggestions
```http
GET /search/suggestions?q=shi
```

### Get Filters
```http
GET /search/filters
```

---

## 9. Admin Endpoints

### Get Dashboard Stats
```http
GET /admin/dashboard
Authorization: Bearer <admin_token>
```

### Get All Users (Admin)
```http
GET /admin/users?page=1&limit=20&search=john
Authorization: Bearer <admin_token>
```

### Get All Orders (Admin)
```http
GET /admin/orders?page=1&limit=20&status=pending&dateFrom=2024-01-01&dateTo=2024-12-31
Authorization: Bearer <admin_token>
```

### Update Order Status (Admin)
```http
PUT /admin/orders/{id}/status
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "status": "shipped"
}
```

---

## Common HTTP Status Codes

- `200 OK` - Success
- `201 Created` - Resource created successfully
- `400 Bad Request` - Invalid request data
- `401 Unauthorized` - Authentication required
- `403 Forbidden` - Insufficient permissions
- `404 Not Found` - Resource not found
- `409 Conflict` - Resource already exists
- `422 Unprocessable Entity` - Validation errors
- `500 Internal Server Error` - Server error

---

## Rate Limiting

- Public endpoints: 100 requests per minute
- Authenticated endpoints: 1000 requests per minute
- Admin endpoints: 5000 requests per minute

## Pagination

Default pagination parameters:
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 20, max: 100)

## Sorting

Available sort fields:
- Products: `title`, `price`, `createdAt`, `updatedAt`
- Orders: `createdAt`, `updatedAt`
- Collections: `title`, `updatedAt`

Sort order: `asc` or `desc`

---

## Implementation Notes

1. **Handle Validation**: Ensure handles are URL-safe, unique, and follow a consistent format (lowercase, hyphens instead of spaces)

2. **Handle Generation**: Auto-generate handles from titles if not provided, with conflict resolution

3. **Database Optimization**: Use database indexes on handle fields for fast lookups

4. **Caching**: Implement caching for:
   - Product listings
   - Collection data
   - User sessions

5. **File Upload**: Handle image uploads with proper validation, resizing, and CDN integration

6. **Security**: 
   - Input validation and sanitization
   - Rate limiting
   - CORS configuration
   - SQL injection prevention

7. **Error Handling**: Consistent error responses with proper HTTP status codes

8. **Logging**: Log all API requests, especially admin actions

9. **Testing**: Implement comprehensive API testing including edge cases
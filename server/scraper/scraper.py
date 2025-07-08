import requests
import json
import os


def scrape_shopify_products(base_url, limit=250):
    """Scrape all product data from a Shopify store with pagination support."""
    base_url = base_url.rstrip('/')
    page = 1
    products = []

    while True:
        json_url = f"{base_url}/products.json?limit={limit}&page={page}"
        try:
            response = requests.get(json_url)
            response.raise_for_status()
            data = response.json()
            current_products = data.get("products", [])
            
            if not current_products:
                break  # No more products to fetch

            for product in current_products:
                product_info = {
                    "id": product.get("id"),
                    "title": product.get("title"),
                    "handle": product.get("handle"),
                    "body_html": product.get("body_html"),
                    "vendor": product.get("vendor"),
                    "product_type": product.get("product_type"),
                    "tags": product.get("tags"),
                    "created_at": product.get("created_at"),
                    "updated_at": product.get("updated_at"),
                    "published_at": product.get("published_at"),
                    "options": product.get("options", []),
                    "variants": [],
                    "images": []
                }

                # Detailed variant info
                for variant in product.get("variants", []):
                    product_info["variants"].append({
                        "id": variant.get("id"),
                        "title": variant.get("title"),
                        "option1": variant.get("option1"),
                        "option2": variant.get("option2"),
                        "option3": variant.get("option3"),
                        "sku": variant.get("sku"),
                        "requires_shipping": variant.get("requires_shipping"),
                        "taxable": variant.get("taxable"),
                        "featured_image": variant.get("featured_image"),
                        "available": variant.get("available"),
                        "price": variant.get("price"),
                        "grams": variant.get("grams"),
                        "compare_at_price": variant.get("compare_at_price"),
                        "position": variant.get("position"),
                        "product_id": variant.get("product_id"),
                        "created_at": variant.get("created_at"),
                        "updated_at": variant.get("updated_at")
                    })

                # Detailed image info
                for image in product.get("images", []):
                    product_info["images"].append({
                        "id": image.get("id"),
                        "created_at": image.get("created_at"),
                        "updated_at": image.get("updated_at"),
                        "product_id": image.get("product_id"),
                        "position": image.get("position"),
                        "variant_ids": image.get("variant_ids"),
                        "src": image.get("src"),
                        "width": image.get("width"),
                        "height": image.get("height")
                    })

                products.append(product_info)
            page += 1

        except requests.RequestException as e:
            print(f"Error fetching products on page {page}: {e}")
            break
        except json.JSONDecodeError:
            print("Error parsing product JSON.")
            break

    return products


def scrape_shopify_collections(base_url, limit=250):
    """Scrape all custom collections from a Shopify store with pagination support."""
    base_url = base_url.rstrip('/')
    page = 1
    collections = []

    while True:
        json_url = f"{base_url}/collections.json?limit={limit}&page={page}"
        try:
            response = requests.get(json_url)
            response.raise_for_status()
            data = response.json()
            current_collections = data.get("collections", [])

            if not current_collections:
                break  # No more collections to fetch

            for collection in current_collections:
                collection_info = {
                    "id": collection.get("id"),
                    "title": collection.get("title"),
                    "handle": collection.get("handle"),
                    "body_html": collection.get("body_html"),
                    "published_at": collection.get("published_at"),
                    "updated_at": collection.get("updated_at"),
                    "image": collection.get("image"),
                    "products_count": collection.get("products_count")
                }
                collections.append(collection_info)

            page += 1

        except requests.RequestException as e:
            print(f"Error fetching collections on page {page}: {e}")
            break
        except json.JSONDecodeError:
            print("Error parsing collection JSON.")
            break

    return collections
def save_to_json(data, filename):
    """Save the scraped data to a JSON file"""
    try:
        with open(filename, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=4)
            print(f"Data saved to {filename}")
    except Exception as e:
        print(f"Error saving file: {e}")

if __name__ == "__main__":
    import sys

    script_dir = sys.path[0]
    shop_url = "https://gonative.eg"  # Replace with the target Shopify store URL

    products = scrape_shopify_products(shop_url)
    save_to_json(products, os.path.join(script_dir, "output", "products.json"))

    collections = scrape_shopify_collections(shop_url)
    save_to_json(collections, os.path.join(script_dir, "output", "collections.json"))

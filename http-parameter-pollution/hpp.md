https://www.google.com/search?q=apple&q=mango&q=banana

when you add more parameter to the url some return first value, some return last value and some return all. This is depend on the backend side.
 - JSP + tomcat will return the first value.
 - php + Apache will return the last value.
 - .Net ASP + IIS will return the [all the values].

 Sure, let's go through a detailed scenario to illustrate how HTTP Parameter Pollution (HPP) works.

### Scenario Example: Online Shopping Cart

#### Application Overview
Imagine an online shopping website where users can add items to their shopping cart by making a request to a specific URL. The URL might look like this:
```
http://example.com/add_to_cart?item_id=42&quantity=1
```

#### Normal Operation
Under normal circumstances, when a user clicks "Add to Cart" for an item with `item_id=42` and specifies a quantity of `1`, the server processes the request and adds one unit of the item with ID `42` to the user's cart.

#### HPP Attack Scenario
An attacker wants to exploit the website's handling of parameters to manipulate the quantity added to the cart.

1. **Crafting the Malicious Request**:
   The attacker modifies the URL to include multiple `quantity` parameters:
   ```
   http://example.com/add_to_cart?item_id=42&quantity=1&quantity=10
   ```

2. **Server-Side Processing**:
   Depending on how the web server or application framework handles multiple parameters with the same name, different behaviors can occur:
   
   - **First Wins**: The server takes the first `quantity` value (`1`) and ignores the rest.
   - **Last Wins**: The server takes the last `quantity` value (`10`).
   - **Concatenation**: The server concatenates the values, possibly creating an invalid request.
   - **Array Handling**: The server treats `quantity` as an array of values `[1, 10]`.

#### Exploitation
If the server or the application uses the "last wins" strategy (a common behavior in many web frameworks), it will process the `quantity=10` parameter and add 10 units of item `42` to the cart instead of just 1.

#### Example Code Handling (PHP)
Here's a simple PHP example to illustrate how this might happen:

```php
// Assuming a request like: http://example.com/add_to_cart?item_id=42&quantity=1&quantity=10
$item_id = $_GET['item_id'];
$quantity = $_GET['quantity']; // If PHP uses 'last wins', this will be '10'

// Process the addition to the cart
addToCart($item_id, $quantity);
```

In this case, the `$_GET['quantity']` will hold the value `10` due to the "last wins" behavior of PHP, leading to the unexpected addition of 10 units of the item.

### Consequences
1. **Inventory Manipulation**: The attacker could add more items to their cart than allowed or manipulate other critical parameters.
2. **Financial Loss**: If the quantity affects pricing or discounts, this could lead to financial loss for the website.
3. **Bypassing Restrictions**: The attacker might bypass quantity limits or other restrictions set by the application.

### Mitigation
To prevent HPP attacks, developers can:
- **Validate and Sanitize Input**: Ensure that only one instance of each expected parameter is present in the request. Reject or handle requests with multiple parameters properly.
- **Use Secure Frameworks**: Utilize web frameworks that handle parameter pollution securely by default.
- **Parameter Whitelisting**: Explicitly specify which parameters are allowed and enforce this strictly.

```php
// Example of parameter validation in PHP
if (count($_GET['quantity']) > 1) {
    // Handle the error, multiple 'quantity' parameters detected
    die("Invalid request");
}
```
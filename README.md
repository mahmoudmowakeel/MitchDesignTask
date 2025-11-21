# E-commerce Product Listing & Details Page

This is a fully functional e-commerce frontend built with **Next.js (App Router, v14+), TypeScript, and Tailwind CSS**. The application integrates with a REST API to display products, supports filtering, sorting, and navigation, and is fully responsive.

---

## Tech Stack

- **Framework:** Next.js (v14+, App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** React hooks / React Query / Context API
- **Icons:** Lucide Icons
- **HTTP Client:** Fetch API
- **Other:** React components, Skeleton loaders

---

### Product Listing Page

- Grid/list layout showing:
  - Product image, title, price, rating, brand
- Quick brand filters: Nike, Adidas, Puma, Reebok, All
- Sorting options: Most Recommended, Price (Low → High), Price (High → Low), Best Rating
- Filter options: Price range, Size (XS → XL), Rating (2+ → 4+ stars)
- Clear all filters and apply selected filters
- Clicking a product navigates to its **Product Details Page**
- Loading states and empty states supported

### Product Details Page

- Large product images
- Product title, brand, price, star rating, and review count
- Size selector with unavailable sizes disabled
- Product description
- Reviews section
- "Add to Cart" button (UI only)
- Breadcrumb/back navigation

### Additional Features

- Loading skeletons
- Network error handling and error UI
- Language support (EN/FR) with API `Accept-Language` header
- Responsive design for mobile, tablet, and desktop
- Pixel-perfect design matching Figma
- Toggle Language Option

---

## Setup Instructions

1. Clone the repository:

```bash
git clone https://github.com/mahmoudmowakeel/MitchDesignTask.git
cd project-folder
npm install
cp .env.example .env -- Provide API URL
```

## API Endpoints Used

- For All Products

```bash
- GET /products
- Query Params: size, brand, status, min_price, max_price, min_rating, sort_by, sort_order
- Headers: Accept-Language
```

- For Single Product

```bash
- GET /products/{id}
- Headers: Accept-Language
```

## How To Run The Project

```bash
npm run run dev
```

## Future improvements

- API need to be fixed because when sending "en" it returns the french response.

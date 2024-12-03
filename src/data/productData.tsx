const productsData = [
    {
        id: 1,
        name: 'Electric Kettle',
        price: 39.99,
        description: 'Fast-boiling electric kettle with temperature control and auto shut-off for safety.',
        images: [
          'https://m.media-amazon.com/images/I/71t7qvB4GYL.__AC_SX300_SY300_QL70_FMwebp_.jpg',
          'https://m.media-amazon.com/images/I/61FPOWyvMOL._AC_SY879_.jpg',
          'https://m.media-amazon.com/images/I/71uloi0z5KL._AC_SY879_.jpg',
        ],
        colors: [
          { name: 'White', hex: '#FFFFFF' },
          { name: 'Black', hex: '#000000' },
        ],
        reviews: [
          { id: 1, name: 'Jordan R.', rating: 4, date: '3 days ago', comment: 'Very efficient and easy to use.' },
        ],
        inStock: true,
        stockQuantity: 45,
        category: 'Kitchen',
      },
    
    {
      id: 2,
      name: 'Wireless Earbuds',
      price: 99.99,
      description: 'Experience true wireless freedom with these sleek and stylish earbuds, featuring superior sound quality and long-lasting battery life.',
      images: [
        'https://m.media-amazon.com/images/I/71SuMqgzDWL._AC_SX425_.jpg',
        'https://m.media-amazon.com/images/I/61vTUs-Ta1L._AC_SX425_.jpg',
        'https://m.media-amazon.com/images/I/611wZrpPPFL._AC_SX425_.jpg',
      ],
      colors: [
        { name: 'White', hex: '#FFFFFF' },
        { name: 'Black', hex: '#000000' },
      ],
      reviews: [
        { id: 1, name: 'Alex P.', rating: 5, date: '3 weeks ago', comment: 'The sound quality is excellent!' },
        { id: 2, name: 'Jordan A.', rating: 4, date: '1 week ago', comment: 'Comfortable, but slightly pricey.' },
      ],
      inStock: true,
      stockQuantity: 25,
      category: 'Electronics',
    },
    {
      id: 3,
      name: 'Sports Sneakers',
      price: 129.99,
      description: 'High-performance sports sneakers designed for optimal comfort and durability during intense workouts or casual wear.',
      images: [
        'https://m.media-amazon.com/images/I/71MN+3P-xzL._AC_SY500_.jpg',
        'https://m.media-amazon.com/images/I/81pZ+PqV0mL._AC_SY500_.jpg',
        'https://m.media-amazon.com/images/I/81rYZPGXckL._AC_SY500_.jpg',
      ],
      sizes: ['7', '8', '9', '10', '11'],
      colors: [
        { name: 'Red', hex: '#FF0000' },
        { name: 'Blue', hex: '#0000FF' },
        { name: 'Orange', hex: '#d9562a' },
      ],
      reviews: [
        { id: 1, name: 'Elliot G.', rating: 4, date: '1 week ago', comment: 'Stylish and comfortable.' },
        { id: 2, name: 'Taylor R.', rating: 5, date: '2 days ago', comment: 'Perfect for my morning runs.' },
      ],
      inStock: true,
      stockQuantity: 30,
      category: 'Clothing',
    },
    {
      id: 4,
      name: 'Smartwatch Series X',
      price: 199.99,
      description: 'A sleek smartwatch with cutting-edge features like heart-rate monitoring, GPS, and a customizable display.',
      images: [
        'https://m.media-amazon.com/images/I/61BPfIy5uRL.__AC_SX300_SY300_QL70_FMwebp_.jpg',
        'https://m.media-amazon.com/images/I/71lWpwvRH4L._AC_SX425_.jpg',
        'https://m.media-amazon.com/images/I/71U-JZkDA1L._AC_SX425_.jpg',
      ],
      colors: [
        { name: 'Silver', hex: '#C0C0C0' },
        { name: 'Gold', hex: '#FFD700' },
      ],
      reviews: [
        { id: 1, name: 'Kim H.', rating: 5, date: '1 month ago', comment: 'Great value for the price.' },
      ],
      inStock: true,
      stockQuantity: 10,
      category: 'Electronics',
    },
    {
      id: 5,
      name: 'Vintage Sunglasses',
      price: 59.99,
      description: 'Classic vintage sunglasses offering UV protection and a stylish retro look.',
      images: [
        'https://m.media-amazon.com/images/I/51uxcEgEFUL._AC_SX522_.jpg',
        'https://m.media-amazon.com/images/I/61ok7J17JqL._AC_SX522_.jpg',
        'https://m.media-amazon.com/images/I/613UeD5sJLL._AC_SX522_.jpg',
      ],
      colors: [
        { name: 'Black', hex: '#000000' },
        { name: 'Brown', hex: '#8B4513' },
      ],
      reviews: [
        { id: 1, name: 'Casey J.', rating: 4, date: '3 days ago', comment: 'Looks great, a little tight fit.' },
      ],
      inStock: true,
      stockQuantity: 40,
      category: 'Accessories',
    },
    {
      id: 6,
      name: 'Minimalist Backpack',
      price: 79.99,
      description: 'A functional and stylish minimalist backpack suitable for daily use or travel.',
      images: [
        'https://m.media-amazon.com/images/I/713gGqf84HL.__AC_SX300_SY300_QL70_FMwebp_.jpg',
        'https://m.media-amazon.com/images/I/81U+dIbre7L._AC_SX425_.jpg',
        'https://m.media-amazon.com/images/I/81BzOlCmCrL._AC_SX425_.jpg',
      ],
      colors: [
        { name: 'Black', hex: '#000000' },
        { name: 'Navy', hex: '#000080' },
        { name: 'Red', hex: '#ab2c37' },
      ],
      reviews: [
        { id: 1, name: 'Jamie B.', rating: 5, date: '2 weeks ago', comment: 'Durable and stylish, perfect for work.' },
      ],
      inStock: true,
      stockQuantity: 50,
      category: 'Accessories',
    },
    {
      id: 7,
      name: 'Gaming Mouse',
      price: 49.99,
      description: 'Precision gaming mouse with customizable DPI settings, RGB lighting, and ergonomic design for long gaming sessions.',
      images: [
        'https://m.media-amazon.com/images/I/61n0IHTywTL.__AC_SX300_SY300_QL70_FMwebp_.jpg',
        'https://m.media-amazon.com/images/I/51VpABY-b6L._AC_SX425_.jpg',
        'https://m.media-amazon.com/images/I/61IiCJ7QggS._AC_SX425_.jpg',
      ],
      colors: [
        { name: 'Black', hex: '#000000' },
        { name: 'Blue', hex: '#005da0' },
        { name: 'Green', hex: '#10c9b9' },
      ],
      reviews: [
        { id: 1, name: 'Chris L.', rating: 5, date: '1 week ago', comment: 'Super responsive and comfortable.' },
      ],
      inStock: true,
      stockQuantity: 35,
      category: 'Electronics',
    },
    {
      id: 8,
      name: '4K Ultra HD Monitor',
      price: 299.99,
      description: 'High-definition 4K monitor with vibrant colors and HDR support, perfect for gaming or work.',
      images: [
        'https://m.media-amazon.com/images/I/71b+UNcbNzL._AC_SY300_SX300_.jpg',
        'https://m.media-amazon.com/images/I/71iPY++JWRL._AC_SX425_.jpg',
        'https://m.media-amazon.com/images/I/71-M9ZNQNKL._AC_SX425_.jpg',
      ],
      colors: [
        { name: 'Black', hex: '#000000' },
      ],
      reviews: [
        { id: 1, name: 'Dana F.', rating: 5, date: '2 weeks ago', comment: 'Crystal clear display, love it!' },
      ],
      inStock: true,
      stockQuantity: 20,
      category: 'Electronics',
    },
    {
        id: 9,
        name: 'Classic Leather Jacket',
        price: 249.99,
        description: 'Premium leather jacket crafted with high-quality materials. Perfect for any occasion, this jacket combines style, comfort, and durability. Featuring a modern cut and timeless design.',
        images: [
          'https://m.media-amazon.com/images/I/61MzP73n5ZL._AC_SX425_.jpg',
          'https://m.media-amazon.com/images/I/71TBbWD8AmL._AC_SX425_.jpg',
        ],
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        colors: [
          { name: 'Black', hex: '#000000' },
          { name: 'Brown', hex: '#8f695f' },
        ],
        reviews: [
          { id: 1, name: 'John D.', rating: 5, date: '2 weeks ago', comment: 'Amazing jacket! Fits perfectly.' },
          { id: 2, name: 'Sarah M.', rating: 4, date: '1 month ago', comment: 'Great quality, but sizing runs small.' },
        ],
        inStock: true,
        stockQuantity: 15,
        category: 'Clothing',
      },

    {
      id: 10,
      name: 'Noise-Cancelling Headphones',
      price: 149.99,
      description: 'High-quality noise-cancelling headphones with wireless connectivity and long battery life.',
      images: [
        'https://m.media-amazon.com/images/I/51n+2LeiDQL._AC_SY300_SX300_.jpg',
        'https://m.media-amazon.com/images/I/71gMHKXhuVL._AC_SX425_.jpg',
        'https://m.media-amazon.com/images/I/71Ru23OSoGL._AC_SX425_.jpg',
      ],
      colors: [
        { name: 'Black', hex: '#000000' },
        { name: 'Blue', hex: '#4f7197' },
        { name: 'Red', hex: '#b22222' },
      ],
      reviews: [
        { id: 1, name: 'Megan S.', rating: 5, date: '1 month ago', comment: 'Great sound quality and comfortable.' },
      ],
      inStock: true,
      stockQuantity: 25,
      category: 'Electronics',
    },

  ]

    export default productsData;
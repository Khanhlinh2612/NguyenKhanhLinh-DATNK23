import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './App.css';

const ADMIN_EMAIL = 'admin@klinhbeauty.com';
const ADMIN_PASSWORD = 'KlinhAdmin@123';

const products = [
  {
    id: 1,
    name: 'Serum DIVE IN Hyaluronic Acid',
    brand: 'Torriden',
    cat: 'Chăm sóc da',
    price: 289000,
    volume: '50ml',
    image: 'https://www.keoji.com.au/cdn/shop/files/Dive-InLowMoleculeHyaluronicAcidSerum_50ml_2_1400x.jpg?v=1713679198',
    description: 'Serum DIVE IN Hyaluronic Acid của Torriden là tinh chất dưỡng ẩm với thành phần nổi bật là Hyaluronic Acid. Sản phẩm hướng đến việc bổ sung độ ẩm, giúp làn da mềm mại và căng mịn hơn.',
    benefits: [
      'Bổ sung độ ẩm cho da.',
      'Hỗ trợ duy trì độ ẩm tự nhiên của da.',
      'Giúp da mềm mại và mịn màng hơn.'
    ],
    skinType: 'Phù hợp với nhiều loại da, đặc biệt là da thiếu ẩm.',
    usage: 'Sau bước làm sạch và toner, lấy một lượng serum vừa đủ thoa đều lên mặt. Vỗ nhẹ để sản phẩm thẩm thấu, sau đó tiếp tục các bước dưỡng da.',
    note: 'Nên sử dụng kết hợp với kem dưỡng ẩm để hỗ trợ duy trì độ ẩm cho da.'
  },
  {
    id: 2,
    name: 'Kem dưỡng UreaRepair',
    brand: 'Eucerin',
    cat: 'Dưỡng ẩm',
    price: 315000,
    volume: '75ml',
    image: 'https://static.thcdn.com/productimg/1600/1600/11115980-7354608724237845.jpg',
    description: 'Eucerin UreaRepair là dòng sản phẩm dưỡng ẩm tập trung vào việc chăm sóc làn da khô và thiếu ẩm. Sản phẩm giúp bổ sung độ ẩm, hỗ trợ cải thiện cảm giác khô ráp và mang lại sự mềm mại cho da.',
    benefits: [
      'Hỗ trợ cấp ẩm cho làn da khô.',
      'Giúp cải thiện cảm giác da khô ráp.',
      'Hỗ trợ duy trì độ mềm mại của da.'
    ],
    skinType: 'Thích hợp với làn da khô hoặc có dấu hiệu thiếu ẩm. Cần kiểm tra đúng phiên bản sản phẩm trước khi sử dụng.',
    usage: 'Lấy một lượng kem vừa đủ, thoa nhẹ nhàng lên vùng da cần chăm sóc sau bước làm sạch.',
    note: 'Sử dụng theo hướng dẫn trên bao bì. Nếu xuất hiện dấu hiệu kích ứng, nên ngừng sử dụng.'
  },
  {
    id: 3,
    name: 'Anessa Mild Milk SPF50+',
    brand: 'Anessa',
    cat: 'Chống nắng',
    price: 425000,
    volume: '60ml',
    image: 'https://image.hsv-tech.io/0x1900/bbx/anessa_essence_uv_sunscreen_mild_milk_60ml_4ee4fb2d8b0a44879cb6f56330ff33f7.png',
    description: 'Anessa Mild Milk SPF50+ là sản phẩm chống nắng dạng sữa với chỉ số chống nắng SPF50+. Sản phẩm được thiết kế để hỗ trợ bảo vệ da trước tác động của tia UV khi hoạt động ngoài trời.',
    benefits: [
      'Hỗ trợ bảo vệ da trước tia UV.',
      'Dạng sữa thuận tiện khi thoa lên da.',
      'Phù hợp để bổ sung vào quy trình chăm sóc da ban ngày.'
    ],
    skinType: 'Có thể cân nhắc cho làn da nhạy cảm; nên kiểm tra bảng thành phần và hướng dẫn của đúng phiên bản.',
    usage: 'Sử dụng ở bước cuối của quy trình chăm sóc da buổi sáng. Thoa lượng phù hợp lên vùng da tiếp xúc với ánh nắng trước khi ra ngoài. Thoa lại theo hướng dẫn trên bao bì.',
    note: 'Không nên bỏ qua việc thoa lại kem chống nắng khi hoạt động ngoài trời trong thời gian dài.'
  },
  {
    id: 4,
    name: 'Nước tẩy trang Hydrabio H2O',
    brand: 'Bioderma',
    cat: 'Làm sạch',
    price: 189000,
    volume: '500ml',
    image: 'https://www.afya-pharmacy.bg/files/products/bioderma-hydrabio-h2o-micelarna-voda-500ml.png',
    description: 'Bioderma Hydrabio H2O là nước tẩy trang ứng dụng công nghệ micellar, hỗ trợ làm sạch bụi bẩn và lớp trang điểm trên da. Sản phẩm thuộc dòng Hydrabio dành cho nhu cầu chăm sóc làn da thiếu ẩm.',
    benefits: [
      'Hỗ trợ loại bỏ bụi bẩn và lớp trang điểm.',
      'Giúp làm sạch da sau một ngày hoạt động.',
      'Phù hợp để sử dụng trong bước làm sạch đầu tiên.'
    ],
    skinType: 'Dòng Hydrabio hướng đến làn da thiếu ẩm. Nên kiểm tra thông tin trên bao bì để xác định phiên bản phù hợp.',
    usage: 'Thấm nước tẩy trang vào bông cotton, nhẹ nhàng lau khắp mặt. Với vùng trang điểm, giữ bông trên da trong giây lát rồi lau nhẹ. Thực hiện các bước làm sạch tiếp theo nếu cần.',
    note: 'Tránh để sản phẩm tiếp xúc trực tiếp với mắt. Không chà xát mạnh khi làm sạch.'
  },
  {
    id: 5,
    name: 'Tinh chất White Perfect',
    brand: "L'Oreal",
    cat: 'Chăm sóc da',
    price: 259000,
    volume: '175ml',
    image: 'https://cdn11.bigcommerce.com/s-iw1z8eqogn/images/stencil/1280x1280/products/524/1760/2ewrrt__36461.1561526733.jpg?c=2',
    description: 'White Perfect là sản phẩm thuộc dòng chăm sóc da White Perfect của L’Oreal. Sản phẩm hướng đến nhu cầu chăm sóc làn da, hỗ trợ cải thiện vẻ ngoài tươi sáng và đều màu hơn.',
    benefits: [
      'Hỗ trợ chăm sóc và dưỡng da.',
      'Góp phần mang lại vẻ ngoài tươi sáng cho làn da.',
      'Có thể kết hợp trong quy trình chăm sóc da hằng ngày theo hướng dẫn của sản phẩm.'
    ],
    skinType: 'Nên kiểm tra thông tin phiên bản và bảng thành phần để lựa chọn phù hợp với loại da.',
    usage: 'Sử dụng theo hướng dẫn trên bao bì của sản phẩm. Thoa một lượng vừa đủ lên da sau bước làm sạch.',
    note: 'Tên White Perfect có thể được sử dụng cho nhiều sản phẩm khác nhau. Cần xác nhận đúng loại sản phẩm và công dụng theo bao bì.'
  },
  {
    id: 6,
    name: 'Toner DIVE IN Hyaluronic Acid',
    brand: 'Torriden',
    cat: 'Chăm sóc da',
    price: 289000,
    volume: '300ml',
    image: 'https://entrevida.com/cdn/shop/products/8809784600206_2048x.jpg?v=1637027332',
    description: 'Toner DIVE IN Hyaluronic Acid của Torriden là sản phẩm dưỡng da có thành phần nổi bật là Hyaluronic Acid, hỗ trợ bổ sung độ ẩm sau bước làm sạch và giúp da sẵn sàng cho các bước dưỡng tiếp theo.',
    benefits: [
      'Hỗ trợ cấp ẩm cho da sau khi rửa mặt.',
      'Giúp da mềm mại và dễ chịu hơn.',
      'Hỗ trợ chuẩn bị da cho các bước serum và kem dưỡng.'
    ],
    skinType: 'Phù hợp với nhiều loại da, đặc biệt là da có nhu cầu bổ sung độ ẩm.',
    usage: 'Sau khi rửa mặt, lấy một lượng toner vừa đủ ra lòng bàn tay hoặc bông cotton. Thoa nhẹ nhàng lên mặt, tránh vùng mắt.',
    note: 'Có thể kết hợp với serum và kem dưỡng trong quy trình chăm sóc da hằng ngày.'
  }
];

const formatPrice = (price) =>
  Number(price || 0).toLocaleString('vi-VN') + 'đ';

const readStorage = (key, fallback) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
};

// Khởi tạo tài khoản Admin mặc định nếu chưa tồn tại.
const initializeUsers = () => {
  const users = readStorage('klinh-users', []);

  const adminExists = users.some(
    (u) => u.email === ADMIN_EMAIL
  );

  if (!adminExists) {
    users.push({
      id: 'admin-default',
      fullName: 'Quản trị viên',
      email: ADMIN_EMAIL,
      phone: '',
      password: ADMIN_PASSWORD,
      role: 'ADMIN',
      status: 'ACTIVE',
      createdAt: new Date().toISOString()
    });

    localStorage.setItem('klinh-users', JSON.stringify(users));
  }

  return users;
};

const getCurrentUser = () => {
  const saved = readStorage('klinh-user', null);

  if (!saved) return null;

  if (typeof saved === 'string') {
    const users = readStorage('klinh-users', []);
    return users.find((u) => u.email === saved) || null;
  }

  return saved;
};

const getFavorites = (email) => {
  if (!email) return [];
  return readStorage(`klinh-favorites-${email}`, []);
};

const statusLabels = {
  PENDING: 'Chờ xử lý',
  CONFIRMED: 'Đã xác nhận',
  SHIPPING: 'Đang giao hàng',
  COMPLETED: 'Hoàn thành',
  CANCELLED: 'Đã hủy'
};

const paymentLabels = {
  UNPAID: 'Chưa thanh toán',
  PENDING: 'Chờ xác nhận',
  PAID: 'Đã thanh toán'
};

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [users, setUsers] = useState(() => initializeUsers());
  const [cart, setCart] = useState(() => readStorage('klinh-cart', []));
  const [orders, setOrders] = useState(() => readStorage('klinh-orders', []));
  const [reviews, setReviews] = useState(() => readStorage('klinh-reviews', []));

  const [q, setQ] = useState('');
  const [cat, setCat] = useState('Tất cả');
  const [page, setPage] = useState('home');
  const [item, setItem] = useState(null);

  const navigateToPage = (nextPage, product = null) => {
    const paths = {
      home: '/',
      favorites: '/favorites',
      cart: '/cart',
      login: '/login',
      account: '/account',
      orders: '/orders',
      checkout: '/checkout',
      admin: '/admin'
    };

    if (nextPage === 'detail' && product) {
      setItem(product);
      navigate(`/products/${product.id}`);
    } else {
      navigate(paths[nextPage] || '/');
    }

    window.scrollTo(0, 0);
  };

  const [user, setUser] = useState(getCurrentUser);

  const [favorites, setFavorites] = useState(() =>
    getFavorites(getCurrentUser()?.email)
  );

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [authMode, setAuthMode] = useState('login');
  const [payment, setPayment] = useState('COD');
  const [rating, setRating] = useState(5);
  const [reviewContent, setReviewContent] = useState('');

  const categories = [
    'Tất cả',
    ...new Set(products.map((p) => p.cat))
  ];

  const shown = useMemo(() => {
    return products.filter((p) => {
      const keyword = q.toLowerCase();

      const matchSearch =
        p.name.toLowerCase().includes(keyword) ||
        p.brand.toLowerCase().includes(keyword);

      const matchCategory =
        cat === 'Tất cả' || p.cat === cat;

      return matchSearch && matchCategory;
    });
  }, [q, cat]);

  const saveUsers = (nextUsers) => {
    setUsers(nextUsers);
    localStorage.setItem('klinh-users', JSON.stringify(nextUsers));
  };

  const saveCart = (nextCart) => {
    setCart(nextCart);
    localStorage.setItem('klinh-cart', JSON.stringify(nextCart));
  };

  const saveOrders = (nextOrders) => {
    setOrders(nextOrders);
    localStorage.setItem('klinh-orders', JSON.stringify(nextOrders));
  };

  const saveReviews = (nextReviews) => {
    setReviews(nextReviews);
    localStorage.setItem('klinh-reviews', JSON.stringify(nextReviews));
  };

  const saveFavorites = (nextFavorites) => {
    setFavorites(nextFavorites);

    if (user?.email) {
      localStorage.setItem(
        `klinh-favorites-${user.email}`,
        JSON.stringify(nextFavorites)
      );
    }
  };

  const addToCart = (product) => {
    const existing = cart.find((p) => p.id === product.id);

    if (existing) {
      saveCart(
        cart.map((p) =>
          p.id === product.id
            ? { ...p, quantity: p.quantity + 1 }
            : p
        )
      );
    } else {
      saveCart([...cart, { ...product, quantity: 1 }]);
    }

    alert('Đã thêm sản phẩm vào giỏ hàng!');
  };

  const changeQuantity = (id, amount) => {
    const nextCart = cart
      .map((p) =>
        p.id === id
          ? { ...p, quantity: p.quantity + amount }
          : p
      )
      .filter((p) => p.quantity > 0);

    saveCart(nextCart);
  };

  const removeItem = (id) => {
    saveCart(cart.filter((p) => p.id !== id));
  };

  const toggleFavorite = (product) => {
    if (!user) {
      alert('Vui lòng đăng nhập để sử dụng danh sách yêu thích!');
      navigateToPage('login');
      setAuthMode('login');
      return;
    }

    const isSaved = favorites.includes(product.id);

    const nextFavorites = isSaved
      ? favorites.filter((id) => id !== product.id)
      : [...favorites, product.id];

    saveFavorites(nextFavorites);
  };

  const isFavorite = (productId) =>
    favorites.includes(productId);

  const favoriteProducts = products.filter(
    (p) => favorites.includes(p.id)
  );

  const total = cart.reduce(
    (sum, p) => sum + p.price * p.quantity,
    0
  );

  const cartCount = cart.reduce(
    (sum, p) => sum + p.quantity,
    0
  );

  const openDetail = (product) => {
    setRating(5);
    setReviewContent('');
    navigateToPage('detail', product);
  };

  const goHome = () => {
    setItem(null);
    navigateToPage('home');
  };

  // Đăng nhập bằng email và mật khẩu.
  const login = (e) => {
    e.preventDefault();

    const normalizedEmail = email.trim().toLowerCase();

    const foundUser = users.find(
      (u) =>
        u.email === normalizedEmail &&
        u.password === password
    );

    if (!foundUser) {
      alert('Email hoặc mật khẩu không chính xác!');
      return;
    }

    if (foundUser.status === 'LOCKED') {
      alert('Tài khoản đã bị khóa. Vui lòng liên hệ quản trị viên!');
      return;
    }

    setUser(foundUser);

    localStorage.setItem(
      'klinh-user',
      JSON.stringify(foundUser)
    );

    setFavorites(getFavorites(foundUser.email));
    setEmail('');
    setPassword('');

    navigateToPage(
      foundUser.role === 'ADMIN' ? 'admin' : 'account'
    );
  };

  // Đăng ký: mọi tài khoản mới đều được gán CUSTOMER.
  const register = (e) => {
    e.preventDefault();

    const normalizedEmail = email.trim().toLowerCase();

    if (!fullName.trim()) {
      alert('Vui lòng nhập họ và tên!');
      return;
    }

    if (password.length < 6) {
      alert('Mật khẩu cần có ít nhất 6 ký tự!');
      return;
    }

    if (password !== confirmPassword) {
      alert('Mật khẩu xác nhận không khớp!');
      return;
    }

    if (users.some((u) => u.email === normalizedEmail)) {
      alert('Email này đã được đăng ký!');
      return;
    }

    const newUser = {
      id: Date.now(),
      fullName: fullName.trim(),
      email: normalizedEmail,
      phone: phone.trim(),
      password,
      role: 'CUSTOMER',
      status: 'ACTIVE',
      createdAt: new Date().toISOString()
    };

    const nextUsers = [...users, newUser];

    saveUsers(nextUsers);
    setUser(newUser);

    localStorage.setItem(
      'klinh-user',
      JSON.stringify(newUser)
    );

    setFavorites([]);

    localStorage.setItem(
      `klinh-favorites-${normalizedEmail}`,
      JSON.stringify([])
    );

    setFullName('');
    setEmail('');
    setPhone('');
    setPassword('');
    setConfirmPassword('');

    alert('Đăng ký tài khoản thành công!');
    navigateToPage('account');
  };

  // Đăng xuất.
  const logout = () => {
    setUser(null);
    setFavorites([]);
    localStorage.removeItem('klinh-user');
    navigateToPage('home');
  };

  const isAdmin = user?.role === 'ADMIN';

  useEffect(() => {
    const path = location.pathname;

    const productMatch = path.match(/^\/products\/(\d+)$/);

    if (productMatch) {
      const product = products.find(
        (p) => p.id === Number(productMatch[1])
      );

      if (product) {
        setItem(product);
        setPage('detail');
        window.scrollTo(0, 0);
      } else {
        setItem(null);
        setPage('home');
        navigate('/', { replace: true });
      }

      return;
    }

    const pageRoutes = {
      '/': 'home',
      '/products': 'home',
      '/favorites': 'favorites',
      '/cart': 'cart',
      '/login': 'login',
      '/account': 'account',
      '/orders': 'orders',
      '/checkout': 'checkout',
      '/admin': 'admin'
    };

    const nextPage = pageRoutes[path];

    if (nextPage) {
      setPage(nextPage);

      if (nextPage !== 'detail') {
        setItem(null);
      }

      if (
        (nextPage === 'account' || nextPage === 'orders') &&
        (!user || isAdmin)
      ) {
        navigate(user && isAdmin ? '/admin' : '/login', {
          replace: true
        });
      }

      if (nextPage === 'checkout' && (!user || isAdmin)) {
        navigate(user && isAdmin ? '/' : '/login', {
          replace: true
        });
      }

      window.scrollTo(0, 0);
    } else {
      setPage('home');
      setItem(null);
      navigate('/', { replace: true });
    }
  }, [location.pathname, user, isAdmin, navigate]);

  const myOrders = orders.filter(
    (order) => order.customerEmail === user?.email
  );

  const hasCompletedPurchase = (productId) => {
    if (!user) return false;

    return orders.some((order) => {
      const completed = order.status === 'COMPLETED';
      const belongsToUser = order.customerEmail === user.email;

      const purchasedProduct = order.items?.some(
        (orderItem) => orderItem.id === productId
      );

      return completed && belongsToUser && purchasedProduct;
    });
  };

  const hasReviewed = (productId) => {
    return reviews.some(
      (review) =>
        review.productId === productId &&
        review.customerEmail === user?.email
    );
  };

  const productReviews = reviews.filter(
    (review) => review.productId === item?.id
  );

  const averageRating = productReviews.length
    ? (
        productReviews.reduce(
          (sum, review) => sum + review.rating,
          0
        ) / productReviews.length
      ).toFixed(1)
    : '0.0';

  const submitReview = (e) => {
    e.preventDefault();

    if (!user) {
      alert('Vui lòng đăng nhập để đánh giá sản phẩm!');
      navigateToPage('login');
      return;
    }

    if (!item) return;

    if (!hasCompletedPurchase(item.id)) {
      alert('Bạn chỉ có thể đánh giá sau khi đơn hàng hoàn thành!');
      return;
    }

    if (hasReviewed(item.id)) {
      alert('Bạn đã đánh giá sản phẩm này rồi!');
      return;
    }

    if (!reviewContent.trim()) {
      alert('Vui lòng nhập nội dung nhận xét!');
      return;
    }

    const newReview = {
      id: Date.now(),
      productId: item.id,
      productName: item.name,
      customerEmail: user.email,
      customerName: user.fullName,
      rating,
      content: reviewContent.trim(),
      createdAt: new Date().toISOString()
    };

    saveReviews([...reviews, newReview]);
    setReviewContent('');
    setRating(5);

    alert('Đánh giá sản phẩm thành công!');
  };

  const checkout = () => {
    if (!user) {
      alert('Vui lòng đăng nhập trước khi đặt hàng!');
      navigateToPage('login');
      return;
    }

    if (isAdmin) {
      alert('Tài khoản Admin không thể đặt hàng!');
      return;
    }

    if (cart.length === 0) {
      alert('Giỏ hàng đang trống!');
      return;
    }

    const newOrder = {
      id: Date.now(),
      customerEmail: user.email,
      customerName: user.fullName,
      items: cart.map((p) => ({
        id: p.id,
        name: p.name,
        price: p.price,
        quantity: p.quantity
      })),
      total,
      paymentMethod: payment,
      paymentStatus: payment === 'COD' ? 'UNPAID' : 'PENDING',
      status: 'PENDING',
      createdAt: new Date().toISOString()
    };

    saveOrders([...orders, newOrder]);

    alert(
      'Đặt hàng thành công!\n' +
      'Mã đơn hàng: ' + newOrder.id +
      '\nPhương thức thanh toán: ' + payment +
      '\nTổng tiền: ' + formatPrice(total)
    );

    saveCart([]);
    navigateToPage('orders');
  };

  // Khách hàng chỉ được hủy đơn đang chờ xử lý.
  const cancelOrder = (orderId) => {
    const order = orders.find((o) => o.id === orderId);

    if (!order || order.customerEmail !== user?.email) return;

    if (order.status !== 'PENDING') {
      alert('Chỉ có thể hủy đơn hàng đang chờ xử lý!');
      return;
    }

    const nextOrders = orders.map((o) =>
      o.id === orderId
        ? { ...o, status: 'CANCELLED' }
        : o
    );

    saveOrders(nextOrders);
    alert('Đã hủy đơn hàng.');
  };

  // Chỉ Admin mới được cập nhật trạng thái đơn hàng.
  const updateOrderStatus = (orderId, nextStatus) => {
    if (!isAdmin) {
      alert('Bạn không có quyền thực hiện chức năng này!');
      return;
    }

    const nextOrders = orders.map((order) => {
      if (order.id !== orderId) return order;

      return {
        ...order,
        status: nextStatus,
        paymentStatus:
          nextStatus === 'COMPLETED' &&
          order.paymentMethod === 'COD'
            ? 'PAID'
            : order.paymentStatus
      };
    });

    saveOrders(nextOrders);
  };

  const updatePaymentStatus = (orderId, nextStatus) => {
    if (!isAdmin) {
      alert('Bạn không có quyền thực hiện chức năng này!');
      return;
    }

    const nextOrders = orders.map((order) =>
      order.id === orderId
        ? { ...order, paymentStatus: nextStatus }
        : order
    );

    saveOrders(nextOrders);
  };

  const renderProductCard = (p) => (
    <article className="product-card" key={p.id}>
      <div className="art" onClick={() => openDetail(p)}>
        <img
          className="product-image"
          src={p.image}
          alt={p.name}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
      </div>

      <div className="product-info">
        <p className="brand">{p.brand}</p>
        <h3>{p.name}</h3>
        <p className="volume">{p.volume}</p>

        <div className="product-bottom">
          <strong>{formatPrice(p.price)}</strong>

          <button
            className="detail-link"
            onClick={() => addToCart(p)}
          >
            + Thêm
          </button>
        </div>

        <div className="product-actions">
          <button
            className="detail-link"
            onClick={() => openDetail(p)}
          >
            Xem chi tiết
          </button>

          <button
            className={`favorite-button ${isFavorite(p.id) ? 'active' : ''}`}
            onClick={() => toggleFavorite(p)}
            title="Thêm vào yêu thích"
          >
            {isFavorite(p.id) ? '♥' : '♡'}
          </button>
        </div>
      </div>
    </article>
  );

  const renderOrder = (order, allowCancel = false) => (
    <article className="order-card" key={order.id}>
      <div className="order-heading">
        <div>
          <strong>Đơn hàng #{order.id}</strong>
          <p>
            {new Date(order.createdAt).toLocaleString('vi-VN')}
          </p>
        </div>

        <span className="order-status">
          {statusLabels[order.status] || order.status}
        </span>
      </div>

      <div className="order-products">
        {order.items?.map((p, index) => (
          <p key={`${order.id}-${p.id}-${index}`}>
            {p.name} × {p.quantity} — {formatPrice(p.price * p.quantity)}
          </p>
        ))}
      </div>

      <p>Phương thức thanh toán: {order.paymentMethod}</p>

      <p>
        Trạng thái thanh toán:{' '}
        {paymentLabels[order.paymentStatus] || order.paymentStatus}
      </p>

      <h3>Tổng tiền: {formatPrice(order.total)}</h3>

      {allowCancel && order.status === 'PENDING' && (
        <button
          className="remove"
          onClick={() => cancelOrder(order.id)}
        >
          Hủy đơn hàng
        </button>
      )}
    </article>
  );

  return (
    <div className="app">
      <header className="top">
        <div className="logo" onClick={goHome}>
          <span>K</span> Klinh Beauty
        </div>

        <nav>
          <button onClick={goHome}>Trang chủ</button>
          <button onClick={goHome}>Sản phẩm</button>

          {!isAdmin && (
            <>
              <button onClick={() => navigateToPage('favorites')}>
                Yêu thích ({favorites.length})
              </button>

              <button onClick={() => navigateToPage('cart')}>
                Giỏ hàng ({cartCount})
              </button>
            </>
          )}

          {user ? (
            <>
              {isAdmin ? (
                <button onClick={() => navigateToPage('admin')}>
                  Quản trị
                </button>
              ) : (
                <>
                  <button onClick={() => navigateToPage('account')}>
                    Tài khoản
                  </button>

                  <button onClick={() => navigateToPage('orders')}>
                    Đơn hàng
                  </button>
                </>
              )}

              <button onClick={logout}>Đăng xuất</button>
            </>
          ) : (
            <button
              onClick={() => {
                setAuthMode('login');
                navigateToPage('login');
              }}
            >
              Đăng nhập
            </button>
          )}
        </nav>
      </header>

      <main>
        {page === 'home' && (
          <>
            <section className="hero">
              <div className="hero-content">
                <p className="eyebrow">KLINH BEAUTY · BEAUTY STORE</p>

                <h1>
                  Chăm sóc làn da,
                  <br />
                  yêu thương chính mình.
                </h1>

                <p>
                  Lựa chọn sản phẩm chăm sóc da phù hợp,
                  nuôi dưỡng vẻ đẹp tự nhiên của bạn.
                </p>

                <button
                  className="primary"
                  onClick={() =>
                    document.getElementById('products')
                      ?.scrollIntoView({ behavior: 'smooth' })
                  }
                >
                  Khám phá ngay
                </button>
              </div>

              <div className="visual">
                <img
                  src="https://prcdn.freetls.fastly.net/release_image/57402/16/57402-16-35ec6d0ebc3d7c1e9e026b2c16fc0045-1862x1336.png?auto=webp&fit=bounds&format=jpeg&height=1350&quality=85%2C65&width=1950"
                  alt="Bộ sưu tập nhiều sản phẩm Torriden"
                  className="hero-product-image"
                />
              </div>
            </section>

            <section className="benefits">
              <div>
                <strong>✦</strong>
                <span>Sản phẩm chính hãng</span>
              </div>

              <div>
                <strong>♡</strong>
                <span>Chăm sóc tận tâm</span>
              </div>

              <div>
                <strong>✧</strong>
                <span>Mua sắm dễ dàng</span>
              </div>
            </section>

            <section id="products" className="products-section">
              <div className="section-heading">
                <p className="eyebrow">OUR COLLECTION</p>
                <h2>Sản phẩm nổi bật</h2>
                <p>
                  Lựa chọn sản phẩm phù hợp với nhu cầu
                  chăm sóc da của bạn.
                </p>
              </div>

              <div className="filters">
                <input
                  type="text"
                  placeholder="Tìm kiếm sản phẩm..."
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                />

                <select
                  value={cat}
                  onChange={(e) => setCat(e.target.value)}
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div className="grid">
                {shown.map(renderProductCard)}
              </div>

              {shown.length === 0 && (
                <p className="empty">
                  Không tìm thấy sản phẩm phù hợp.
                </p>
              )}
            </section>
          </>
        )}

        {page === 'detail' && item && (
          <section className="detail">
            <button className="back" onClick={goHome}>
              ← Quay lại sản phẩm
            </button>

            <div className="art big">
              <img
                className="product-image detail-image"
                src={item.image}
                alt={item.name}
              />
            </div>

            <div className="detail-info">
              <p className="brand">{item.brand}</p>
              <h1>{item.name}</h1>
              <p>Phân loại: {item.cat}</p>
              <p>Dung tích: {item.volume}</p>
              <h2>{formatPrice(item.price)}</h2>

              {!isAdmin && (
                <button
                  className="primary"
                  onClick={() => addToCart(item)}
                >
                  Thêm vào giỏ hàng
                </button>
              )}

              <button
                className={`favorite-button detail-favorite ${isFavorite(item.id) ? 'active' : ''}`}
                onClick={() => toggleFavorite(item)}
              >
                {isFavorite(item.id)
                  ? '♥ Đã yêu thích'
                  : '♡ Thêm vào yêu thích'}
              </button>
            </div>

            <div className="detail-description">
              <h2>Thông tin chi tiết sản phẩm</h2>

              <div className="description-block">
                <h3>Giới thiệu sản phẩm</h3>
                <p>{item.description}</p>
              </div>

              <div className="description-block">
                <h3>Công dụng nổi bật</h3>
                <ul>
                  {item.benefits.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>
              </div>

              <div className="description-block">
                <h3>Loại da phù hợp</h3>
                <p>{item.skinType}</p>
              </div>

              <div className="description-block">
                <h3>Hướng dẫn sử dụng</h3>
                <p>{item.usage}</p>
              </div>

              <div className="description-block">
                <h3>Lưu ý khi sử dụng</h3>
                <p>{item.note}</p>
              </div>
            </div>

            <section className="review-section">
              <h2>Đánh giá sản phẩm</h2>

              <div className="review-summary">
                <div className="average-rating">
                  <strong>{averageRating}</strong>

                  <div className="stars">
                    {'★'.repeat(Math.round(Number(averageRating)))}
                    {'☆'.repeat(5 - Math.round(Number(averageRating)))}
                  </div>

                  <span>{productReviews.length} lượt đánh giá</span>
                </div>

                <div className="rating-note">
                  Đánh giá từ khách hàng đã mua sản phẩm.
                </div>
              </div>

              <div className="review-list">
                {productReviews.length === 0 ? (
                  <p className="empty">
                    Sản phẩm chưa có đánh giá.
                  </p>
                ) : (
                  productReviews.map((review) => (
                    <article className="review-card" key={review.id}>
                      <div className="review-heading">
                        <strong>
                          {review.customerName || review.customerEmail}
                        </strong>

                        <span className="stars">
                          {'★'.repeat(review.rating)}
                          {'☆'.repeat(5 - review.rating)}
                        </span>
                      </div>

                      <p>{review.content}</p>

                      <small>
                        {new Date(review.createdAt).toLocaleDateString('vi-VN')}
                      </small>
                    </article>
                  ))
                )}
              </div>

              <div className="review-form-area">
                <h3>Viết đánh giá của bạn</h3>

                {!user ? (
                  <div className="review-message">
                    <p>Vui lòng đăng nhập để đánh giá sản phẩm.</p>

                    <button
                      className="primary"
                      onClick={() => {
                        setAuthMode('login');
                        navigateToPage('login');
                      }}
                    >
                      Đăng nhập
                    </button>
                  </div>
                ) : isAdmin ? (
                  <p className="review-message">
                    Tài khoản quản trị không thể gửi đánh giá.
                  </p>
                ) : hasReviewed(item.id) ? (
                  <p className="review-message">
                    Bạn đã gửi đánh giá cho sản phẩm này.
                  </p>
                ) : !hasCompletedPurchase(item.id) ? (
                  <p className="review-message">
                    Bạn cần mua sản phẩm và có đơn hàng hoàn
                    thành trước khi gửi đánh giá.
                  </p>
                ) : (
                  <form className="review-form" onSubmit={submitReview}>
                    <label>Chọn số sao đánh giá</label>

                    <div className="rating-picker">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          type="button"
                          key={star}
                          className={star <= rating ? 'selected' : ''}
                          onClick={() => setRating(star)}
                          aria-label={`${star} sao`}
                        >
                          ★
                        </button>
                      ))}
                    </div>

                    <label htmlFor="review-content">
                      Nội dung nhận xét
                    </label>

                    <textarea
                      id="review-content"
                      rows="4"
                      placeholder="Chia sẻ trải nghiệm của bạn về sản phẩm..."
                      value={reviewContent}
                      onChange={(e) => setReviewContent(e.target.value)}
                      required
                    />

                    <button className="primary" type="submit">
                      Gửi đánh giá
                    </button>
                  </form>
                )}
              </div>
            </section>
          </section>
        )}

        {page === 'favorites' && (
          <section className="products-section">
            <div className="section-heading">
              <p className="eyebrow">MY FAVORITES</p>
              <h2>Sản phẩm yêu thích</h2>
              <p>Danh sách sản phẩm bạn đã lưu.</p>
            </div>

            {!user ? (
              <div className="empty">
                <p>Vui lòng đăng nhập để xem danh sách yêu thích.</p>
                <button
                  className="primary"
                  onClick={() => navigateToPage('login')}
                >
                  Đăng nhập
                </button>
              </div>
            ) : favoriteProducts.length === 0 ? (
              <div className="empty">
                <p>Bạn chưa có sản phẩm yêu thích nào.</p>
                <button className="primary" onClick={goHome}>
                  Khám phá sản phẩm
                </button>
              </div>
            ) : (
              <div className="grid">
                {favoriteProducts.map(renderProductCard)}
              </div>
            )}
          </section>
        )}

        {page === 'cart' && (
          <section className="cart">
            <h1>Giỏ hàng của bạn</h1>

            {cart.length === 0 ? (
              <div className="empty">
                <p>Giỏ hàng hiện chưa có sản phẩm.</p>
                <button className="primary" onClick={goHome}>
                  Tiếp tục mua sắm
                </button>
              </div>
            ) : (
              <>
                {cart.map((p) => (
                  <div className="cart-item" key={p.id}>
                    <img src={p.image} alt={p.name} />

                    <div>
                      <h3>{p.name}</h3>
                      <p>{p.brand}</p>
                      <strong>{formatPrice(p.price)}</strong>

                      <div className="quantity">
                        <button onClick={() => changeQuantity(p.id, -1)}>
                          −
                        </button>

                        <span>{p.quantity}</span>

                        <button onClick={() => changeQuantity(p.id, 1)}>
                          +
                        </button>
                      </div>
                    </div>

                    <button
                      className="remove"
                      onClick={() => removeItem(p.id)}
                    >
                      Xóa
                    </button>
                  </div>
                ))}

                <div className="cart-total">
                  <h2>Tổng tiền: {formatPrice(total)}</h2>

                  <button
                    className="primary"
                    onClick={() => navigateToPage('checkout')}
                  >
                    Tiến hành đặt hàng
                  </button>
                </div>
              </>
            )}
          </section>
        )}

        {page === 'login' && (
          <section className="auth">
            <p className="eyebrow">WELCOME TO KLINH BEAUTY</p>

            <h1>
              {authMode === 'login' ? 'Đăng nhập' : 'Tạo tài khoản'}
            </h1>

            <p>
              {authMode === 'login'
                ? 'Đăng nhập để sử dụng các chức năng mua sắm.'
                : 'Điền thông tin để đăng ký tài khoản khách hàng.'}
            </p>

            <form onSubmit={authMode === 'login' ? login : register}>
              {authMode === 'register' && (
                <>
                  <input
                    type="text"
                    placeholder="Họ và tên"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />

                  <input
                    type="tel"
                    placeholder="Số điện thoại"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </>
              )}

              <input
                type="email"
                placeholder="Địa chỉ email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <input
                type="password"
                placeholder="Mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              {authMode === 'register' && (
                <input
                  type="password"
                  placeholder="Xác nhận mật khẩu"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              )}

              <button className="primary" type="submit">
                {authMode === 'login' ? 'Đăng nhập' : 'Đăng ký'}
              </button>
            </form>

            <p>
              {authMode === 'login'
                ? 'Chưa có tài khoản?'
                : 'Đã có tài khoản?'}
              {' '}

              <button
                type="button"
                className="detail-link"
                onClick={() => {
                  setAuthMode(
                    authMode === 'login' ? 'register' : 'login'
                  );
                  setPassword('');
                  setConfirmPassword('');
                }}
              >
                {authMode === 'login' ? 'Đăng ký ngay' : 'Đăng nhập'}
              </button>
            </p>
          </section>
        )}

        {page === 'account' && user && !isAdmin && (
          <section className="auth">
            <p className="eyebrow">MY ACCOUNT</p>
            <h1>Tài khoản của bạn</h1>

            <div className="account-info">
              <p>Họ và tên: {user.fullName}</p>
              <p>Email: {user.email}</p>
              <p>Số điện thoại: {user.phone || 'Chưa cập nhật'}</p>
              <p>Vai trò: Khách hàng (CUSTOMER)</p>
            </div>

            <button
              className="primary"
              onClick={() => navigateToPage('favorites')}
            >
              Xem sản phẩm yêu thích
            </button>

            <button
              className="primary"
              onClick={() => navigateToPage('orders')}
            >
              Xem đơn hàng của tôi
            </button>

            <button className="primary" onClick={logout}>
              Đăng xuất
            </button>
          </section>
        )}

        {page === 'orders' && user && !isAdmin && (
          <section className="order-section">
            <div className="section-heading">
              <p className="eyebrow">ORDER HISTORY</p>
              <h2>Đơn hàng của tôi</h2>
              <p>Theo dõi tình trạng các đơn hàng đã đặt.</p>
            </div>

            {myOrders.length === 0 ? (
              <div className="empty">
                <p>Bạn chưa có đơn hàng nào.</p>
                <button className="primary" onClick={goHome}>
                  Tiếp tục mua sắm
                </button>
              </div>
            ) : (
              myOrders
                .slice()
                .reverse()
                .map((order) => renderOrder(order, true))
            )}
          </section>
        )}

        {page === 'checkout' && (
          <section className="auth checkout">
            <p className="eyebrow">ORDER INFORMATION</p>
            <h1>Xác nhận đơn hàng</h1>

            <p>Khách hàng: {user?.fullName}</p>
            <p>Email: {user?.email}</p>
            <p>Tổng thanh toán:</p>
            <h2>{formatPrice(total)}</h2>

            <label htmlFor="payment">
              Phương thức thanh toán
            </label>

            <select
              id="payment"
              value={payment}
              onChange={(e) => setPayment(e.target.value)}
            >
              <option value="COD">
                Thanh toán khi nhận hàng (COD)
              </option>

              <option value="Chuyển khoản ngân hàng">
                Chuyển khoản ngân hàng
              </option>
            </select>

            <button className="primary" onClick={checkout}>
              Xác nhận đặt hàng
            </button>
          </section>
        )}

        {page === 'admin' && isAdmin && (
          <section className="admin-section">
            <div className="section-heading">
              <p className="eyebrow">KLINH BEAUTY ADMIN</p>
              <h2>Trang quản trị hệ thống</h2>
              <p>Xin chào, {user.fullName}.</p>
            </div>

            <div className="admin-overview">
              <div className="admin-card">
                <strong>{products.length}</strong>
                <span>Sản phẩm</span>
              </div>

              <div className="admin-card">
                <strong>{orders.length}</strong>
                <span>Tổng đơn hàng</span>
              </div>

              <div className="admin-card">
                <strong>
                  {orders.filter((o) => o.status === 'PENDING').length}
                </strong>
                <span>Đơn chờ xử lý</span>
              </div>

              <div className="admin-card">
                <strong>
                  {orders.filter((o) => o.status === 'COMPLETED').length}
                </strong>
                <span>Đơn hoàn thành</span>
              </div>
            </div>

            <h2>Quản lý đơn hàng</h2>

            {orders.length === 0 ? (
              <p className="empty">Chưa có đơn hàng nào.</p>
            ) : (
              <div className="admin-orders">
                {orders
                  .slice()
                  .reverse()
                  .map((order) => (
                    <article className="order-card" key={order.id}>
                      <div className="order-heading">
                        <div>
                          <strong>Đơn hàng #{order.id}</strong>
                          <p>
                            Khách hàng: {order.customerName || order.customerEmail}
                          </p>
                          <p>Email: {order.customerEmail}</p>
                          <p>
                            Ngày đặt:{' '}
                            {new Date(order.createdAt).toLocaleString('vi-VN')}
                          </p>
                        </div>
                      </div>

                      <div className="order-products">
                        {order.items?.map((p, index) => (
                          <p key={`${order.id}-${p.id}-${index}`}>
                            {p.name} × {p.quantity} — {formatPrice(p.price * p.quantity)}
                          </p>
                        ))}
                      </div>

                      <h3>Tổng tiền: {formatPrice(order.total)}</h3>
                      <p>Thanh toán: {order.paymentMethod}</p>

                      <label htmlFor={`order-status-${order.id}`}>
                        Trạng thái đơn hàng
                      </label>

                      <select
                        id={`order-status-${order.id}`}
                        value={order.status}
                        onChange={(e) =>
                          updateOrderStatus(order.id, e.target.value)
                        }
                      >
                        <option value="PENDING">Chờ xử lý</option>
                        <option value="CONFIRMED">Đã xác nhận</option>
                        <option value="SHIPPING">Đang giao hàng</option>
                        <option value="COMPLETED">Hoàn thành</option>
                        <option value="CANCELLED">Đã hủy</option>
                      </select>

                      <label htmlFor={`payment-status-${order.id}`}>
                        Trạng thái thanh toán
                      </label>

                      <select
                        id={`payment-status-${order.id}`}
                        value={order.paymentStatus}
                        onChange={(e) =>
                          updatePaymentStatus(order.id, e.target.value)
                        }
                      >
                        <option value="UNPAID">Chưa thanh toán</option>
                        <option value="PENDING">Chờ xác nhận</option>
                        <option value="PAID">Đã thanh toán</option>
                      </select>
                    </article>
                  ))}
              </div>
            )}

            <h2>Danh sách sản phẩm</h2>

            <div className="admin-table">
              {products.map((p) => (
                <div className="admin-product-row" key={p.id}>
                  <span>{p.name}</span>
                  <span>{p.brand}</span>
                  <strong>{formatPrice(p.price)}</strong>
                </div>
              ))}
            </div>
          </section>
        )}

        {page === 'admin' && !isAdmin && (
          <section className="auth">
            <h1>Không có quyền truy cập</h1>
            <p>Chức năng này chỉ dành cho quản trị viên.</p>

            <button className="primary" onClick={goHome}>
              Quay về trang chủ
            </button>
          </section>
        )}
      </main>

      <footer>
        <div className="footer-logo">Klinh Beauty</div>

        <p>
          Chăm sóc làn da – Nâng niu vẻ đẹp tự nhiên.
        </p>

        <p>
          © 2026 Klinh Beauty. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
export const baseURL = import.meta.env.VITE_API_URL;

const SummaryApi = {
    register: {
        url: `/auth/register`,
        method: 'post'
    },
    login: {
        url: `/auth/login`,
        method: 'post'
    },
    forgot_password: {
        url: `/auth/forget-password/:mobile`,
        method: 'put'
    },
    forgot_password_otp_verification: {
        url: `/user/verify-forgot-password-otp`,
        method: 'put'
    },
    resetPassword: {
        url: `/user/reset-password`,
        method: 'put'
    },
    refreshToken: {
        url: `/user/refresh-token`,
        method: 'post'
    },
    userDetails: {
        url: `/users`,
        method: 'get'
    },
    logout: {
        url: `/user/logout`,
        method: 'get'
    },
    uploadAvatar: {
        url: `/user/upload-avatar`,
        method: 'put'
    },
    updateUserDetails: {
        url: `/auth/update-user`,
        method: 'put'
    },
    addCategory: {
        url: `/category/add-category`,
        method: 'post'
    },
    uploadImage: {
        url: `/file/upload`,
        method: 'post'
    },
    getCategory: {
        url: `/categories`,
        method: 'get'
    },
    updateCategory: {
        url: `/category/update`,
        method: 'put'
    },
    deleteCategory: {
        url: `/category/delete`,
        method: 'delete'
    },
    createSubCategory: {
        url: `/subcategory/create`,
        method: 'post'
    },
    getSubCategory: {
        url: `/subcategoryproduct/categoryserviceid`,
        method: 'get'
    },
    updateSubCategory: {
        url: `/subcategory/update`,
        method: 'put'
    },
    deleteSubCategory: {
        url: `/subcategory/delete`,
        method: 'delete'
    },
    createProduct: {
        url: `/product/create`,
        method: 'post'
    },
    getProduct: {
        url: `/products`,
        method: 'get'
    },
    getProductByCategory: {
        url: `/product/get-product-by-category`,
        method: 'post'
    },
    getProductByCategoryAndSubCategory: {
        url: `/products/get-product-by-subcategory`,
        method: 'get'
    },
    getProductDetails: {
        url: `/product/get-product-details`,
        method: 'post'
    },
    updateProductDetails: {
        url: `/product/update-product-details`,
        method: 'put'
    },
    deleteProduct: {
        url: `/product/delete-product`,
        method: 'delete'
    },
    searchProduct: {
        url: `/products/search`,
        method: 'post'
    }, 
    searchSuggestion: {
        url: `/products/suggestions`,
        method: 'post'
    },
    addTocart: {
        url: `/cart/create`,
        method: 'post'
    },
    getCartItem: {
        url: `/cart/get`,
        method: 'get'
    },
    updateCartItemQty: {
        url: `/cart/update-qty`,
        method: 'put'
    },
    deleteCartItem: {
        url: `/cart/reset-cart`,
        method: 'delete'
    },
    resetCartItem: {
        url: `/cart/reset-cart`,
        method: 'delete'
    },
    createAddress: {
        url: `/addresss`,
        method: 'post'
    },
    getAddress: {
        url: `/addresss`,
        method: 'get'
    },
    updateAddress: {
        url: `/addresss`,
        method: 'put'
    },
    disableAddress: {
        url: `/addresss`,
        method: 'delete'
    },
    CashOnDeliveryOrder: {
        url: `/orders/NewOrder`,
        method: 'post'
    },
    payment_url: {
        url: `/order/checkout`,
        method: 'post'
    },
    getOrderItems: {
        url: `/orders/OrdersByUser`,
        method: 'get'
    }
};

export default SummaryApi;

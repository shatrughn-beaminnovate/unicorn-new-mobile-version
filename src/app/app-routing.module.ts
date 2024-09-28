import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BlogComponent } from './pages/blog/blog.component';
import { BlogDetailComponent } from './pages/blog/blog-detail/blog-detail.component';
import { NewsAndEventComponent } from './pages/news-and-event/news-and-event.component';
import { BlinkitComponent } from './pages/blinkit/blinkit.component';
import { BlinkitOrderPlacedComponent } from './pages/blinkit/blinkit-order-placed/blinkit-order-placed.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'm-login', loadChildren: () => import('./pages/login/m-login/m-login.module').then(m => m.MLoginModule)
  },
  {
    path: 'login/:token', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
  },
  // {
  //   path: 'verify-user', loadChildren: () => import('./pages/verify-user/verify-user.module').then(m => m.VerifyUserModule)
  // },
  {
    path: 'verify-user/:token', component: HomeComponent
  },
  // {
  //   path: 'login/:token', component: HomeComponent
  // },
  {
    path: 'blinkit/product/:id', component: BlinkitComponent
  },
  {
    path: 'blinkit/order_placed/:orderId', component: BlinkitOrderPlacedComponent
  },
  // {
  //   path: 'forgot-password', loadChildren: () => import('./pages/forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule)
  // },
  // {
  //   path: 'reset-password', loadChildren: () => import('./pages/reset-password/reset-password.module').then(m => m.ResetPasswordModule)
  // },
  {
    path: 'product', loadChildren: () => import('./pages/product/product.module').then(m => m.ProductModule)
  },
  {
    path: 'products', loadChildren: () => import('./pages/products/products.module').then(m => m.ProductsModule)
  },
  {
    path: 'type', loadChildren: () => import('./pages/type-product/type-product.module').then(m => m.TypeProductModule)
  },
  {
    path: 'category', loadChildren: () => import('./pages/categories/categories.module').then(m => m.CategoriesModule)
  },
  {
    path: 'watch-category', loadChildren: () => import('./pages/watch-category/watch-category.module').then(m => m.WatchCategoryModule)
  },
  {
    path: 'watch-product', loadChildren: () => import('./pages/watch-product/watch-product.module').then(m => m.WatchProductModule)
  },
  {
    path: 'view-cart', loadChildren: () => import('./pages/cart/cart.module').then(m => m.CartModule)
  },
  {
    path: 'view-cart', loadChildren: () => import('./pages/cart/cart.module').then(m => m.CartModule)
  },
  {
    path: 'checkout', loadChildren: () => import('./pages/checkout/checkout.module').then(m => m.CheckoutModule)
  },
  {
    path: 'accessories', loadChildren: () => import('./pages/accessories/accessories.module').then(m => m.AccessoriesModule)
  },
  {
    path: 'back-to-school', loadChildren: () => import('./pages/bts/bts.module').then(m => m.BtsModule)
  },
  {
    path: 'contact', loadChildren: () => import('./pages/contact/contact.module').then(m => m.ContactModule)
  },
  {
    path: 'support', loadChildren: () => import('./pages/support/support.module').then(m => m.SupportModule)
  },
  {
    path: 'training', loadChildren: () => import('./pages/training/training.module').then(m => m.TrainingModule)
  },
  {
    path: 'find-store', loadChildren: () => import('./pages/find-store/find-store.module').then(m => m.FindStoreModule)
  },
  {
    path: 'hot-deals', loadChildren: () => import('./pages/hot-deals/hot-deals.module').then(m => m.HotDealsModule)
  },
  {
    path: 'deals-of-day', loadChildren: () => import('./pages/deals-day/deals-day.module').then(m => m.DealsDayModule)
  },
  {
    path: 'account', loadChildren: () => import('./pages/account/account.module').then(m => m.AccountModule)
  },
  {
    path: 'buy-back', loadChildren: () => import('./pages/buy-back/buy-back.module').then(m => m.BuyBackModule)
  },
  {
    path: 'Home-Pod', loadChildren: () => import('./pages/homepod-mini/home-pod.module').then(m => m.HomePodModule)
  },
  {
    path: 'cancellation-policy', loadChildren: () => import('./pages/cancellation-policy/cancellation-policy.module').then(m => m.CancellationPolicyModule)
  },
  {
    path: 'prebooking-terms-and-conditions', loadChildren: () => import('./pages/prebooking-terms-and-conditions/prebooking-terms.module').then(m => m.PrebookingTermsModule)
  },
  {
    path: 'privacy-policy', loadChildren: () => import('./pages/privacy-policy/privacy-policy.module').then(m => m.PrivacyPolicyModule)
  },
  {
    path: 'terms-conditions', loadChildren: () => import('./pages/terms-conditions/terms-conditions.module').then(m => m.TermsConditionsModule)
  },
  {
    path: 'shipping-delivery-policy', loadChildren: () => import('./pages/shipping-delivery-policy/shipping-delivery.module').then(m => m.ShippingDeliveryModule)
  },
  {
    path: 'website-disclaimer-policy', loadChildren: () => import('./pages/website-disclaimer-policy/website-disclaimer.module').then(m => m.WebsiteDisclaimerModule)
  },
  {
    path: 'iphone-for-life', loadChildren: () => import('./pages/iPhone-for-life/iphone-for.module').then(m => m.IphoneModule)
  },
  {
    path: 'iphone-life-product', loadChildren: () => import('./pages/iPhone-life/iPhone-life.module').then(m => m.IphoneLifeModule)
  },
  {
    path: 'blog', component: BlogComponent
  },
  {
    path: 'blog/:slug', component: BlogDetailComponent
  },
  {
    path: 'news-and-event', component: NewsAndEventComponent
  },
  {
    path: 'page', loadChildren: () => import('./pages/page/page.module').then(m => m.PageModule)
  },
  {
    path: '**', redirectTo: 'page-not-found', pathMatch: 'full', data: { title: '404 - Page not found' }
  },
  {
    path: 'page-not-found', loadChildren: () => import('./pages/page-not-found/page-not-found.module').then(m => m.PageNotFoundModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
// useHash: true,  // use this for only office server production build for not found page
export class AppRoutingModule {
}

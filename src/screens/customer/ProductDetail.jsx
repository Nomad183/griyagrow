import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './Customer.module.css';
import { useCustomer } from './CustomerContext.jsx';
import { Icon, ProductMedia, formatRupiah } from './CustomerUI.jsx';

export default function ProductDetail() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { products, addToCart } = useCustomer();
  const product = products.find((item) => item.id === productId) || products[0];
  const adoption = product.category === 'adoption';

  const buyNow = () => {
    if (adoption) navigate(`/customer/adoption-checkout?product=${product.id}`);
    else { navigate(`/customer/checkout?direct=1&product=${product.id}`); }
  };

  return (
    <div className={styles.detailPage}>
      <div className={styles.detailImageWrap}>
        <ProductMedia product={product} className={styles.detailImage} />
        <button type="button" className={styles.floatingBack} onClick={() => navigate(-1)} aria-label="Kembali"><Icon name="back" size={30} /></button>
        <button type="button" className={styles.floatingCart} onClick={() => navigate('/customer/cart')} aria-label="Keranjang"><Icon name="cart" size={28} /></button>
      </div>
      <div className={styles.productDetailBody}>
        <div className={styles.detailTitleRow}><h1>{product.name}</h1><span className={styles.detailRating}><Icon name="star" size={22} /> {product.rating}/5</span></div>
        <p className={styles.detailCategory}>{adoption ? 'Paket Adopsi' : product.categoryLabel}</p>
        <p className={styles.detailPrice}>{formatRupiah(product.price)} <span>/ {product.unit}</span></p>
        <div className={styles.detailTags}><span className={styles.organicTag}><Icon name="leaf" size={17} /> {adoption ? 'Update Berkala' : '100% Organik'}</span><span className={styles.freshTag}><Icon name="shield" size={17} /> Garansi Segar</span></div>
        <div className={styles.detailDivider} />
        <h2>Deskripsi Produk</h2>
        <p className={styles.detailDescription}>{product.description} {adoption ? 'Kami merawat tanaman dengan sepenuh hati di greenhouse dan memberikan pembaruan pertumbuhan hingga siap dipanen.' : 'Dipanen dan dikemas dengan memperhatikan kualitas serta kesegaran produk.'}</p>
      </div>
      <div className={`${styles.detailActions} ${adoption ? styles.singleAction : ''}`}>
        {!adoption && <button type="button" className={styles.outlineAction} onClick={() => { addToCart(product.id); navigate('/customer/cart'); }}>+ Keranjang</button>}
        <button type="button" className={styles.primaryAction} onClick={buyNow}>{adoption ? 'Adopsi' : 'Beli Langsung'}</button>
      </div>
    </div>
  );
}

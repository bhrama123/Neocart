import "./Hero.css";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>🔥 Mega Electronics Sale</h1>

        <p>Up to 50% OFF on Mobiles, Laptops & Accessories</p>

       <button
  onClick={() =>
    document
      .getElementById("products")
      ?.scrollIntoView({ behavior: "smooth" })
  }
>
  Shop Now
</button>
      </div>
    </section>
  );
}

export default Hero;
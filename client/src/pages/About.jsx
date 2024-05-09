import React from 'react'

export default function About() {
  return (
    <div className='grid grid-cols-2 p-20 px-36'>
      <div className='flex justify-center items-center'>
        <img src="/images/logo.png" alt="Everything branded log" />
      </div>
      <div className='p-10 text-lg'>
        <p className='text-4xl font-bold'>About Everything Branded</p>
        <br />
        <p>Welcome to Everything Branded, your premier destination for personalized designs on a wide array of products here in sunny Barbados! At Everything Branded, we believe that every item is an opportunity for self-expression and individuality. Whether you're looking to add a personal touch to your daily essentials or seeking unique gifts for loved ones, we've got you covered with our diverse selection of customizable merchandise</p>
        <br />
        <p>Our store prides itself on offering top-quality printing services tailored to your specific needs. From stylish apparel adorned with your favorite designs to practical accessories that reflect your personality, Everything Branded transforms ordinary items into extraordinary pieces that make a statement. With our commitment to excellence and attention to detail, we ensure that each product leaving our store is not just an item but a reflection of your unique style and creativity. Step into Everything Branded today and let your imagination soar!</p>
      </div>
    </div>
  )
}

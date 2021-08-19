import Banner from 'components/Banner'
import Header from 'components/Header'
import ProductFeed from 'components/ProductFeed'
import { GetServerSideProps } from 'next'
import Head from 'next/head'

export type IProduct = {
  id: number
  title: string
  price: number
  category: string
  description: string
  image: string
}

type HomeProps = {
  products: IProduct[]
}

export default function Home({ products }: HomeProps) {
  return (
    <div className="bg-gray-100">
      <Head>
        <title>Amazon 2.0</title>
      </Head>

      <Header />

      <main className="max-w-screen-2xl mx-auto">
        <Banner />
        <ProductFeed products={products} />
      </main>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const products = await fetch('https://fakestoreapi.com/products').then(
    response => response.json()
  )

  return {
    props: {
      products,
    },
  }
}

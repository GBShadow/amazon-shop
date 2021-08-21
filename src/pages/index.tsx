import Banner from 'components/Banner'
import Header from 'components/Header'
import ProductFeed from 'components/ProductFeed'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { Session } from 'next-auth'
import { getSession } from 'next-auth/client'
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

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await getSession(context)
  const products = await fetch('https://fakestoreapi.com/products').then(
    response => response.json()
  )

  return {
    props: {
      products,
      session,
    },
  }
}

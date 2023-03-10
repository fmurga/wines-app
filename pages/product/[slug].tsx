import { ShopLayout } from "../../components/layouts";
import { Box, Button, Chip, Grid, Typography } from "@mui/material";
import { ProductSlideshow } from "../../components/products";
import { ItemCounter } from "../../components/ui";
import { GetStaticProps, NextPage } from "next";

interface Props {
  product: IProduct;
}

const ProductPage: NextPage<Props> = ({ product }) => {
  return (
    <ShopLayout title={product.title} pageDescription={product.description}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={7}>
          <ProductSlideshow images={product.images} />
        </Grid>

        <Grid item xs={12} sm={5}>
          <Box display="flex" flexDirection="column">
            <Typography variant="h1" component="h1">
              {product.title}
            </Typography>
            <Typography
              variant="subtitle1"
              component="h2"
            >{`$ ${product.price}`}</Typography>

            <Box sx={{ my: 2 }}>
              <Typography variant="subtitle2" sx={{ mx: 1 }}>
                Cantidad
              </Typography>
              <ItemCounter />
            </Box>

            <Button color="secondary" className="cicular-btn">
              Agregar al carrito
            </Button>
            {/* <Chip label="No hay disponibles" color="error" variant="outlined"/> */}
            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle2">Descripción</Typography>
              <Typography variant="body2">{product.description}</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default ProductPage;

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

import { IProduct } from "../../interfaces/products";
import { dbProduct } from "../../database";

// export const getServerSideProps: GetServerSideProps = async ({params}) => {

//   const {slug} = params as {slug: string}
//   const product = await dbProduct.getProductBySlug(slug)

//   if (!product) {
//     return {
//       redirect: {
//         destination: '/404',
//         permanent: false
//       }
//     }
//   }

//   return {
//     props: {
//       product
//     }
//   }
// }

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes
import { GetStaticPaths } from "next";

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  
  const productSlugs = await dbProduct.getAllProductSlugs();

  
  return {
    paths: productSlugs.map( ({ slug }) => ({
      params: {
        slug
      }
    })),
    fallback: 'blocking'
  }
}
export const getStaticProps: GetStaticProps = async ({ params }) => {
  
  const { slug = '' } = params as { slug: string };
  const product = await dbProduct.getProductBySlug( slug );

  if ( !product ) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      product
    },
    revalidate: 60 * 60 * 24
  }
}

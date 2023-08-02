import React, { useEffect, useState } from 'react'
import axios from "axios"
import {server} from "../index"
import {Container, HStack, VStack, Image, Heading, Text} from "@chakra-ui/react"
import Loader from './Loader';
import Error from "./Error"
const Exchanges = () => {
  const [exchanges, setExchanges] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchExchanges = async() => {

      try{

        const {data} = await axios.get(`${server}/exchanges`)
        setExchanges(data)
        console.log(data)
        setLoading(false)
      }
      catch(error){
        setError(true)
        setLoading(false)
      }
    }
    fetchExchanges()
  }, [])

  if(error)
  {
    return <Error></Error>
  }

  const ExchangeCard = ({name, url, img, rank}) => {
    return (<a href = {url} target = {"blank"}>
    <VStack w = {"52"}
    shadow = {"lg"}
    p = {"8"}
    borderRadius={"lg"}
    transition = {"all 0.4s"}
    m = {"4"}
    css = {{
       "&:hover": {
        transform : "scale(1.3)",
      },
    }}>
        <Image 
        src = {img}
        w = {"10"}
        h = {"10"}
        objectFit = {"contain"} 
        alt = {"Exchange"}>
        </Image>

        <Heading size = {"md"}
        noOfLines = {1}>{rank}</Heading>

        <Text noOfLines = {1}> {name}</Text>
    </VStack>

    </a>
  )}
  return (
        <Container maxW = {"container.x1"} >
            {loading ? <Loader/> : <>
              <HStack wrap = {"wrap"} justifyContent={"space-evenly"}>
                {exchanges.map((i) => {
                  return (
                    <ExchangeCard
                    key = {i.id}
                    name = {i.name}
                    img={i.image}
                    rank = {i.rank}
                    url = {i.url}>
                    </ExchangeCard>
                  )
                })}
              </HStack>
            </>}
        </Container>
  )
}

export default Exchanges
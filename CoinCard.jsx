import React from 'react'
import { VStack, Image, Heading, Text} from "@chakra-ui/react"
import {Link} from "react-router-dom"
const CoinCard = ({name, id, img, symbol,url, price, currencySymbol = "₹"}) => {
        return (
        <Link to = {`/coin/${url}`} target = {"blank"}>
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
            noOfLines = {1}>{symbol}</Heading>
    
            <Text noOfLines = {1}> {name}</Text>
            <Text noOfLines = {1}> {price? `${currencySymbol}${price}` : "NA"}</Text>

        </VStack>
    
        </Link>
      )}

export default CoinCard
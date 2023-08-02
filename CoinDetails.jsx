import React, { useEffect, useState } from 'react'
import Loader from './Loader';
import { Box, Container, HStack, Radio, RadioGroup, VStack, Text, Image, Stat, StatLabel, StatNumber, StatHelpText, StatArrow, Badge, Progress, Button } from '@chakra-ui/react';
import axios from 'axios';
import {server} from "../index"
import {useParams} from "react-router-dom"
import Error from "./Error"
import Chart from './Chart';
const CoinDetails = () => {
  const [coin, setCoin] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [currency, setCurrency] = useState("inr")
  const [days, setDays] = useState("24hr")
  const [chartArray, setChartArray] = useState([])

  const currencySymbol = currency === 'inr'? '₹' : currency === 'eur' ? '€' : "$"

  const params = useParams()
  

  useEffect(() => {
    // console.log(params)
    const fetchCoin = async() => {
      try {
        const { data } = await axios.get(`${server}/coins/${params.id}`);
        const {data: chartData} = await axios.get(`${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`)
        setCoin(data);
        setChartArray(chartData.prices)
        setLoading(false);
      } catch (error) {
        
        setError(true);
        setLoading(false);
      }
    };
    fetchCoin();
  }, [params.id, currency, days]);
  
  if(error){
    return <Error message = {"Error due to technical fault. Please try again after some time"}></Error>
  }

  const CustomBar = ({high, low}) => (
    <VStack w = {"full"}>
      <Progress value = {50} colorScheme = {'teal'} w = {"full"}></Progress>
      <HStack justifyContent={"space-between"} w = {"full"}>
          <Badge children = {low} colorScheme = {"red"}></Badge>
          <Text> 24 hr range</Text>
          <Badge children = {high} colorScheme = {"green"}></Badge>
      </HStack>
    </VStack>
  )
  const Item = ({ title, value }) => (
    <HStack justifyContent={"space-between"} w={"full"} my={"4"}>
      <Text fontFamily={"Bebas Neue"} letterSpacing={"widest"}>
        {title}
      </Text>
      <Text>{value}</Text>
    </HStack>
  );

  const btns = ["24h", "7d", "14d", "30d", "60d", "200d", "1y", "max"];

  const switchChartStats = (key) => {
    switch (key) {
      case "24h":
        setDays("24h");
        setLoading(true);
        break;
      case "7d":
        setDays("7d");
        setLoading(true);
        break;
      case "14d":
        setDays("14d");
        setLoading(true);
        break;
      case "30d":
        setDays("30d");
        setLoading(true);
        break;
      case "60d":
        setDays("60d");
        setLoading(true);
        break;
      case "200d":
        setDays("200d");
        setLoading(true);
        break;
      case "1y":
        setDays("365d");
        setLoading(true);
        break;
      case "max":
        setDays("max");
        setLoading(true);
        break;

      default:
        setDays("24h");
        setLoading(true);
        break;
    }
  };

  return (
        <Container maxW = {"container.x1"} >
            {loading ? <Loader/> : <>
                <Box width = {"full"}
                borderWidth = {"1"}>
                <Chart arr = {chartArray} currency={currencySymbol} days = {days}></Chart>
                </Box>

                <HStack p="4" overflowX={"auto"}>
            {btns.map((i) => (
              <Button
                disabled={days === i}
                key={i}
                onClick={() => switchChartStats(i)}
              >
                {i}
              </Button>
            ))}
          </HStack>

                <RadioGroup value = {currency}
                  p = {"4"}
                  onChange={setCurrency}
                >
              <HStack spacing = {"4"}>
                <Radio value = {"inr"}>INR</Radio>
                <Radio value = {"usd"}>USD</Radio>
                <Radio value = {"eur"}>EUR</Radio>
              </HStack>
            </RadioGroup>

            <VStack spacing = {"4"} p = {"16"} alignItems = {"flex-start"}>
              <Text fontSize = {"small"} alignSelf = {"center"} opacity = {0.7}>
                  Last Updated on {Date(coin.market_data.last_updated).split("G")[0]}
              </Text>

              <Image src = {coin.image.large}
              w = {"16"}
              h = {'16'}
              objectFit={"contain"}></Image>

              <Stat>
                <StatLabel>{coin.name}</StatLabel>
                <StatNumber>
                {currencySymbol}
                {coin.market_data.current_price[currency]}</StatNumber>
                <StatHelpText>
                  <StatArrow type = {coin.market_data.price_change_percentage_24h > 0 ? "increase" : "decrease"}>
                  </StatArrow>
                  {coin.market_data.price_change_percentage_24h}
                </StatHelpText>
              </Stat>

              <Badge
              fontSize = {"2xl"}
              bgColor = {"blackAlpha.800"}
              color = {"white"}>
                {`#${coin.market_cap_rank}`}
              </Badge>

              <CustomBar 
              high = {`${currencySymbol}${coin.market_data.high_24h[currency]}`}
              low = {`${currencySymbol}${coin.market_data.low_24h[currency]}`}></CustomBar>

              <Box w = {"full"} p = {"4"}>
                <Item title = {"max supply"} value = {coin.market_data.max_supply}></Item>
                <Item title = {"circulating supply"} value = {coin.market_data.circulating_supply}></Item>
                <Item title = {"Market cap"} value = {`${currencySymbol}${coin.market_data.market_cap[currency]}`}></Item>
                <Item title = {"All Time High"} value = {`${currencySymbol}${coin.market_data.ath[currency]}`}></Item>
                <Item title = {"All Time Low"} value = {`${currencySymbol}${coin.market_data.atl[currency]}`}></Item>
              </Box>
            </VStack>
            </>}
        </Container>
  )
}

export default CoinDetails
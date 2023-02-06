import { HistoryDTO } from "@dtos/HistoryDTO";
import { Heading, HStack, Text, VStack } from "native-base";

type HistoryCardProps = {
  data: HistoryDTO;
}

export function HistoryCard({ data }: HistoryCardProps) {
  return (
    <HStack w="full" px={5} py={4} mb={3} bg="gray.600"
      alignItems="center" rounded="md"
    >
      <VStack mr={5} flex={1}>
        <Heading numberOfLines={1} color="white" fontSize="md" textTransform="capitalize" fontFamily='heading'
        >{data.group}</Heading>
        <Text color="gray.100" fontSize="lg" numberOfLines={1}>{data.name}</Text>
      </VStack>
      <Text color="gray.300" fontSize="md">
        {data.hour}
      </Text>

    </HStack>
  )
}
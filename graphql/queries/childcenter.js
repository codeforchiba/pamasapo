import gql from "graphql-tag";

export const search = gql`
  query {
    search(limit: 50) {
      items {
        id
        name
        kana
        postalCode
        prefecture
        city
        ward
        address
        lat
        long
        nursery {
          facility {
            ownership
            nurseryType
            nurserySubType
            openingTime
            closingTime
            hasParkingLot
            numberOfParkingLot
          }
          service {
            temporaryCareService
            spotCareService
            extendedCareService
            nightCareService
            h24CareService
          }
        }
      }
    }
  }
`;

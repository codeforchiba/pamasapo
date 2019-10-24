import gql from "graphql-tag";

export const search = gql`
  query {
    search {
      items {
        id
        name
        kana
        postalCode
        prefecture
        city
        ward
        address
        nursery {
          facility {
            ownership
            nurseryType
            nurserySubType
            openingTime
            closingTime
            ageTo
            hasYard
            areaOfYard
            hasPool
            hasParkingLot
            numberOfParkingLot
          }
          service {
            supportMaturnityLeave
            saturdayCareService
            holidayCareService
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

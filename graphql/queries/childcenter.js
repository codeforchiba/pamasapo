import gql from "graphql-tag";

export const get = gql`
  query getItem($id: ID!) {
    get(id: $id) {
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
      phone
      fax
      email
      website
      remarksBasic
      nursery {
        facility {
          owner
          ownership
          nurseryType
          nurserySubType
          openingTime
          closingTime
          standardOpeningTime
          standardClosingTime
          shortOpeningTime
          shortClosingTime
          ageFrom
          ageTo
          capacity1
          capacity2
          capacity3
          areaOfNurseryRoom
          hasYard
          areaOfYard
          hasPool
          hasParkingLot
          numberOfParkingLot
          remarksFacility
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
          provideLunch
          lunchWithStaple1
          lunchWithStaple2
          provideSnacks
          provideShuttleBus
          useUniform
          useSmock
          useTrainingWear
          remarks
        }
        status {
          numbers0
          numbers1
          numbers2
          numbers3
          numbers4
          numbers5
          standbys0
          standbys1
          standbys2
          standbys3
          standbys4
          standbys5
          availability0
          availability1
          availability2
          availability3
          availability4
          availability5
          baseDate
        }
      }
      afterSchool {
        facility {
          capacityAllGrade
          capacityHighGrade
          closingTime
          openingTime
          owner
          ownership
          remarks
        }
        service {
          extendedCareService
          holidayCareService
          remarks
          saturdayCareService
        }
      }
    }
  }
`;

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
        lat
        long
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
        afterSchool {
          facility {
            capacityAllGrade
            capacityHighGrade
            closingTime
            openingTime
            owner
            ownership
            remarks
          }
          service {
            saturdayCareService
            remarks
            holidayCareService
            extendedCareService
          }
        }
      }
    }
  }
`;

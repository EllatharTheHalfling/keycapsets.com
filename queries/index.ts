import { gql } from 'apollo-boost';

const FETCH_KEYCAPSET_QUERY = gql`
    query FETCH_KEYCAPSET_QUERY($limit: Int, $offset: Int, $filter: KeycapsetFilter) {
        allKeycapsetsCount
        keycapsets(limit: $limit, offset: $offset, filter: $filter) {
            _id
            name
            type
            brand
            coverImageUrl
            slug
            groupbuyStartDate
            groupbuyEndDate
            isInterestCheck
            material
            availability
        }
    }
`;

const CREATE_KEYSET_MUTATION = gql`
    mutation keycapsetCreateOne(
        $name: String
        $type: String
        $active: Boolean
        $coverImageUrl: String
        $vendors: [String]
        $imageUrls: [String]
        $websiteUrl: String
        $brand: String
        $material: String
        $accentColor1: String
        $accentColor2: String
        $accentColor3: String
        $designerName: String
        $groupbuyStartDate: Date
        $groupbuyEndDate: Date
        $kits: [KitInput]
        $isInterestCheck: Boolean
    ) {
        createKeycapset(
            name: $name
            type: $type
            active: $active
            coverImageUrl: $coverImageUrl
            vendors: $vendors
            imageUrls: $imageUrls
            websiteUrl: $websiteUrl
            groupbuyStartDate: $groupbuyStartDate
            groupbuyEndDate: $groupbuyEndDate
            brand: $brand
            material: $material
            accentColor1: $accentColor1
            accentColor2: $accentColor2
            accentColor3: $accentColor3
            kits: $kits
            designerName: $designerName
            isInterestCheck: $isInterestCheck
        ) {
            name
            type
            _id
        }
    }
`;

const CREATE_VENDOR_MUTATION = gql`
    mutation CREATE_VENDOR_MUTATION(
        $name: String
        $country: String
        $logoUrl: String
        $socials: [String]
        $url: String
    ) {
        createVendor(name: $name, country: $country, logoUrl: $logoUrl, socials: $socials, url: $url) {
            name
            _id
        }
    }
`;

const GET_VENDORS_QUERY = gql`
    query GET_VENDORS_QUERY {
        vendors {
            name
            _id
            logoUrl
            url
            country
        }
    }
`;

const GET_SINGLE_SET_QUERY = gql`
    query GET_SINGLE_SET_QUERY($type: String!, $slug: String!) {
        keycapsetBySlug(type: $type, slug: $slug) {
            _id
            name
            designerName
            type
            coverImageUrl
            groupbuyStartDate
            groupbuyEndDate
            active
            coverImageUrl
            imageUrls
            websiteUrl
            vendors {
                name
                url
                socials
                logoUrl
            }
            slug
            accentColor1
            accentColor2
            accentColor3
            designerName
            brand
            material
            isInterestCheck
        }
    }
`;

const GET_SETS_BY_QUERY = gql`
    query getKeycapsetByQuery($query: String) {
        keycapsetsByQuery(query: $query) {
            _id
            name
            type
            coverImageUrl
            slug
            groupbuyStartDate
            groupbuyEndDate
            updatedAt
            createdAt
        }
    }
`;

const GOOGLE_LOGIN = gql`
    mutation GOOGLE_LOGIN($token: String!) {
        googleLogin(token: $token) {
            token
            user {
                name
            }
            firstLogin
        }
    }
`;

export {
    FETCH_KEYCAPSET_QUERY,
    CREATE_KEYSET_MUTATION,
    CREATE_VENDOR_MUTATION,
    GET_VENDORS_QUERY,
    GET_SINGLE_SET_QUERY,
    GET_SETS_BY_QUERY,
    GOOGLE_LOGIN,
};

import AppSearchAPIConnector from "@elastic/search-ui-app-search-connector";
import React from "react";
import {
  ErrorBoundary,
  Facet,
  SearchProvider,
  SearchBox,
  Results,
  PagingInfo,
  ResultsPerPage,
  Paging,
  Sorting,
  WithSearch
} from "@elastic/react-search-ui";
import {
  BooleanFacet,
  Layout,
  SingleLinksFacet,
  SingleSelectFacet
} from "@elastic/react-search-ui-views";
import "@elastic/react-search-ui-views/lib/styles/styles.css";
import ResultView from "./ResultView";




const connector = new AppSearchAPIConnector({
  engineName: "steinsaltz-archive-search",
  endpointBase: "https://steinsaltz-archive-search.ent.eastus.azure.elastic-cloud.com"
});

const config = {
  
  alwaysSearchOnInitialLoad: true,
  apiConnector: connector,
  hasA11yNotifications: true,
  searchQuery: {
    result_fields: {
      uniqueFileName: { snippet: {
        size: 30,
        fallback: true
      }
    },
      file_path: { raw: {}},
      content: { snippet: {
        size: 500,
        fallback: true
      }
      }
      
    },
    search_fields: {
      file_path: {},
      content: {}	
},
    disjunctiveFacets: [""],
      facets: {
        format: { type: "value", size: 30 }, 
        language: { type: "value", size: 30 },
        type: { type: "value", size: 30 },
        subsubject1: { type: "value", size: 30 },
        year: {
          type: "range",
          ranges: [
            // { from: 1900, to: 1950, name: "1900-1950" },
            { from: 1950, to: 1970, name: "1950-1970" },
            { from: 1970, to: 1990, name: "1970-1990" },
            { from: 1990, name: "1990-" }
          ] 
        }
        
        
      }
  }

};

export default function App() {
  return (
    <SearchProvider config={config}>
      <WithSearch
        mapContextToProps={({ wasSearched }) => ({
          wasSearched
        })}
      >
        {({ wasSearched }) => {
          return (
            <div className="App">
              <ErrorBoundary>
                <Layout
                  header={<SearchBox
                     debounceLength={300}
                    searchAsYouType={true}
                  />}
                  sideContent={<div>
                      <Facet
                          field="format"
                          label="פורמט"
                          filterType="any"
      
                        />
                      <Facet
                        field="language"
                        label="שפה"
                        filterType="any"
    
                      />
                      <Facet
                        field="type"
                        label="סוג מסמך"
                        filterType="any"
    
                      />
                      <Facet
                        field="subsubject1"
                        label="נושא"
                        filterType="any"
    
                      />
                      <Facet
                        field="year"
                        label="שנה"
                        filterType="any"   
                      />
                  </div>}
                  bodyContent={
                    <Results
                      resultView={ResultView}
                  />
                    
                  }
                  bodyHeader={
                    <React.Fragment>
                      {wasSearched && <PagingInfo />}
                      {wasSearched && <ResultsPerPage />}
                    </React.Fragment>
                  }
                  bodyFooter={<Paging />}
                />
              </ErrorBoundary>
            </div>
          );
        }}
      </WithSearch>
    </SearchProvider>
  );
}
import React, { useEffect, useState } from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";
import axios from "axios";
// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

// Create Document Component
export default function Documents() {
  const [data,setData] =useState([])
  useEffect(()=>{
    axios.get("http://localhost:5000/api/getHisab/678650f1e3c936b1c3a9b134").then((res)=>{
      console.log(res,'resssss')
      setData(res?.data?.data)
          }).catch((err)=>{
      
          })
  },[])
  const MyDocument = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>Section #1</Text>
        </View>
        <View style={styles.section}>
          <Text>Section #2</Text>
        </View>
      </Page>
    </Document>
  );
  return (
    <div className="w-full h-[750px]">
      <PDFViewer width="100%" height="100%">
        <MyDocument />
      </PDFViewer>
    </div>
  );
}

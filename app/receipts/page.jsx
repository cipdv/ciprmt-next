"use client"

import React, { useEffect, useState } from 'react';
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    padding: 10
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  },
  text: {
    margin: 12,
  }
});

// Create Document Component
const MyDocument = ({treatment}) => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.section}><Text style={styles.text}>Cip de Vries, RMT</Text></View>
      <View style={styles.section}><Text style={styles.text}>268 Shuter St, Toronto ON M5A 1W3</Text></View>
      <View style={styles.section}><Text style={styles.text}>416-258-1230</Text></View>
      <View style={styles.section}><Text style={styles.text}>Registration Number: U035</Text></View>
      <View style={styles.section}><Text style={styles.text}>HST Number: 845 918 200 RT0001</Text></View>
      <View style={styles.section}><Text style={styles.text}>Official Receipt</Text></View>
      <View style={styles.section}><Text style={styles.text}>For Massage Therapy Treatment for: {treatment.firstName} {treatment.lastName}</Text></View>
      <View style={styles.section}><Text style={styles.text}>Date of treatment: {treatment.date}</Text></View>
      <View style={styles.section}><Text style={styles.text}>Time of treatment: {treatment.time}</Text></View>
      <View style={styles.section}><Text style={styles.text}>Duration: {treatment.duration} minutes</Text></View>
      <View style={styles.section}><Text style={styles.text}>Payment received: ${treatment.price}</Text></View>
      <View style={styles.section}><Text style={styles.text}>Payment received from: {treatment.firstName} {treatment.lastName}</Text></View>
      <View style={styles.section}><Text style={styles.text}>Receipt number: {treatment._id}</Text></View>
      <View style={styles.section}><Text style={styles.text}>RMT signature:</Text></View>
      {/* <Image src={signature} style={styles.sig} /> */}
    </Page>
  </Document>
);

const Receipts = ({treatment, treatmentDateTime, currentDateTime, strTime}) => {

  const router = useRouter();
  const [treatments, setTreatments] = useState(null);
  const { data: session, status } = useSession();


  useEffect(() => {

    if (status === 'authenticated') {
        const id = session?.user?.id;
        fetch(`/api/treatments/${id}`)
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setTreatments(data);
                } else {
                    console.error('Error: expected array but received', data);
                }
            })
            .catch(error => {
                console.error('Error fetching treatments', error);
            });
    } else {
        router.push('/login');
    }
}, [status, session]);


return (
  <div>
    <h1>Receipts</h1>
    {treatments && treatments.map((treatment, index) => (
      <div key={index} className='pdf-receipt-container mt-5'>
        <p>{treatment.date}</p>
        <PDFDownloadLink document={<MyDocument treatment={treatment}/>} fileName={`${treatment.date}_${treatment._id}_receipt.pdf`} className='pdf-download-link'>
          {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download PDF')}
        </PDFDownloadLink>
      </div>
    ))}
  </div>
);
};

export default Receipts
import React, { useState, useEffect } from 'react';
import { Button, Spinner, Box, Text, VStack, useToast } from '@chakra-ui/react';
import pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

import axiosHeader from '../axiosHeader'; // Replace with your Axios setup

// Register pdfMake fonts
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const CertificateGenerator = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const toast = useToast(); // For showing success/error messages

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosHeader.get('/startups/getStartupById'); // API call
        setData(response.data); // Set fetched data from API
      } catch (err) {
        console.error('Error fetching data:', err);
        toast({
          title: 'Error fetching data.',
          description: 'Please check your connection or try again later.',
          status: 'error',
          duration: 4000,
          isClosable: true,
        });
      }
    };

    fetchData();
  }, [toast]);

  const generatePDF = () => {
    console.log(data)
    console.log(data.status);
    if (!data||data.status!='approved') {
      toast({
        title: 'Data not available.',
        description: 'No startup data available to generate the certificate.',
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
      return;
    }

    setLoading(true); // Start loading
    const documentDefinition = {
      pageSize: 'A4',
      pageMargins: [40, 60, 40, 60],
      background: [
        {
          text: 'Certificate',
          color: '#e0f5e0', // Light green for a subtle background
          bold: true,
          fontSize: 150,
          opacity: 0.1,
          alignment: 'center',
          absolutePosition: { x: 0, y: 300 },
          repeat: true,
        },
      ],
      content: [
        // Header Section
        {
          text: `CERTIFICATE NO: ${data._id.slice(-6)}`,
          style: 'certificateNo',
          alignment: 'right',
          margin: [0, 0, 0, 20],
        },
        {
          text: 'CERTIFICATE OF RECOGNITION',
          style: 'header',
          alignment: 'center',
          margin: [0, 0, 0, 30],
        },
        {
          canvas: [{ type: 'rect', x: 0, y: 0, w: 515, h: 2, lineColor: '#4caf50' }],
          margin: [0, 0, 0, 20],
        },
        {
          text: `This is to certify that ${data?.name || 'Name of the Company'}, incorporated as a Private Limited Company on ${new Date().toLocaleDateString()}, is recognized as a startup by the Department for Promotion of Industry and Internal Trade. The startup is working in AYUSH Industry and ${data?.sector || 'Sector Name'} sector as self-certified by them.`,
          style: 'normalText',
          alignment: 'justify',
          margin: [0, 20, 0, 20],
        },
        {
          text: 'This certificate shall only be valid for the Entity up to Ten years from the date of its incorporation only if its turnover for any of the financial years has not exceeded ₹ 100 Cr.',
          style: 'smallText',
          alignment: 'center',
          margin: [0, 10, 0, 20],
        },
        {
          columns: [
            {
              text: '28-06-2021\nDATE OF ISSUE',
              style: 'date',
              alignment: 'left',
              margin: [0, 0, 20, 0],
            },
            {
              text: '20-05-2028\nVALID UPTO',
              style: 'date',
              alignment: 'right',
              margin: [20, 0, 0, 0],
            },
          ],
        },
        { text: '\n\n\n' },
    
        // Footer Section
        {
          columns: [
            {
              canvas: [{ type: 'rect', x: 0, y: 0, w: 150, h: 150, r: 75, lineColor: '#4caf50' }],
              margin: [0, 10, 0, 0],
            },
            {
              text: `${data?.name || 'Name of the Company'}`,
              style: 'bottomText',
              alignment: 'right',
              margin: [0, 20, 0, 0],
            },
            {
              text: `www.${data?.name || 'example'}.com`,
              style: 'bottomText',
              alignment: 'right',
              margin: [0, 0, 0, 10],
            },
          ],
        },
        {
          columns: [
            {
              text: '#startupAyush',
              style: 'startupIndia',
              alignment: 'right',
              margin: [0, 10, 0, 0],
            },
          ],
        },
        {
          canvas: [{ type: 'rect', x: 0, y: 0, w: 515, h: 2, lineColor: '#4caf50' }],
          margin: [0, 10, 0, 0],
        },
        {
          // Signature Section
          columns: [
            {
              text: '',
              width: '*',
            },
            {
              text: 'Signature',
              style: 'signatureText',
              alignment: 'right',
              margin: [0, 20, 0, 0],
            },
          ],
        },
      ],
      styles: {
        certificateNo: {
          fontSize: 16,
          bold: true,
          color: '#4caf50', // Green color for certificate number
          marginBottom: 15,
        },
        header: {
          fontSize: 36,
          bold: true,
          color: '#4caf50', // Green color for header
          marginBottom: 30,
          decoration: 'underline',
        },
        normalText: {
          fontSize: 14,
          color: '#333',
          margin: [0, 20, 0, 20],
        },
        smallText: {
          fontSize: 12,
          color: '#333',
          margin: [0, 10, 0, 20],
        },
        date: {
          fontSize: 12,
          bold: true,
          color: '#333',
          margin: [0, 5],
        },
        bottomText: {
          fontSize: 16,
          bold: true,
          color: '#333',
          margin: [0, 20, 0, 10],
        },
        startupIndia: {
          fontSize: 18,
          bold: true,
          color: '#4caf50',
          margin: [0, 10, 0, 10],
        },
        signatureText: {
          fontSize: 14,
          color: '#4caf50',
          margin: [0, 20, 20, 0],
          borderBottom: '1px solid #4caf50', // Adds a line for signature area
        },
      },
      // Adding a border around the page
      pageBackground: [
        {
          type: 'rect',
          x: 10,
          y: 10,
          w: 575,
          h: 822,
          lineWidth: 4,
          lineColor: '#4caf50', // Green border
        },
      ],
    };
    
    


    try {
      pdfMake.createPdf(documentDefinition).download('certificate.pdf');
      toast({
        title: 'Certificate generated!',
        description: 'The certificate has been successfully downloaded.',
        status: 'success',
        duration: 4000,
        isClosable: true,
      });
    } catch (err) {
      console.error('Error generating PDF:', err);
      toast({
        title: 'Error generating certificate.',
        description: 'An error occurred while generating the certificate.',
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <VStack spacing={5}>
      <Box>
        {loading ? (
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="teal.500"
            size="xl"
          />
        ) : (
          <Button
            onClick={generatePDF}
            colorScheme="teal"
            borderRadius="md"
            size="lg"
            _hover={{ bg: 'teal.600' }}
          >
            Generate Certificate
          </Button>
        )}
      </Box>
    </VStack>
  );
};

export default CertificateGenerator;

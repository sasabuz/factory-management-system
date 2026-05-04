import { jsPDF } from "jspdf";
import { SaleItem } from "./SalesTable";
import { Button } from "../ui/button";
import { Download } from "lucide-react";

interface DownloadProps {
  sale: SaleItem;
}

const DownloadReceipt = ({ sale }: DownloadProps) => {
  const handleDownload = () => {
    const doc = new jsPDF();

    // header
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text("Pure Agro Industries", 15, 20);

    doc.setDrawColor(150, 150, 150);
    doc.line(15, 25, 195, 25); // simple underline

    // Reciept Title
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Sales Receipt", 15, 40);

    // Customer
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Customer Name: ${sale.buyerName}`, 15, 55);
    doc.text(`Mobile No. : ${sale.buyerMobileNumber}`, 15, 65);

    // Product Details
    doc.setFont("helvetica", "bold");
    doc.text("Product Details", 15, 85);

    doc.setFont("helvetica", "normal");
    doc.text(`Product: ${sale.productName}`, 15, 95);
    doc.text(`Unit: ${sale.unit}`, 15, 105);
    doc.text(`Total Price: ${sale.totalPrice} TK`, 15, 115);
    doc.text(
      `Sold Date: ${new Date(sale.soldAt).toLocaleDateString()}`,
      15,
      125
    );

    // footer
    doc.setDrawColor(200, 200, 200);
    doc.line(15, 150, 195, 150);

    doc.setFontSize(10);
    doc.setFont("helvetica", "italic");
    doc.text("Thank you for choosing Pure Agro Industries.", 15, 160);

    // DOWNLOAD PDF
    doc.save(`${sale.productName}-receipt.pdf`);
  };

  return (
    <Button
    variant={"outline"}
      onClick={handleDownload}
      className="text-blue-600 dark:text-gray-300 cursor-pointer"
    >
        <Download></Download>
      Download PDF
    </Button>
  );
};

export default DownloadReceipt;

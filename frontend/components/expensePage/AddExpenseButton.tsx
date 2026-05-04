"use client";
import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import Modal from "../ui/modal";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useExpenseStore } from "@/stores/expenseStore";

const AddExpenseButton = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [formData, setFormaData] = useState({
    name: "",
    description: "",
    date: "",
  });

  //store
  const {AddExpense} = useExpenseStore();

  // handle modal open/close
  const handleModalOpen = () => {
    setIsOpen(true);
    setError("");
    setSuccess("");
  };

  //handle the from submission
  const handleSubmit = async()=>{
    //clear previous error
    setError("");
    setSuccess("");
    //validation
    if(formData.name.length<3){
        setError('Expense Name must be greater than 3 characters!');
        return;
    }
    if(formData.description.length<10){
        setError('Description must be greater than 10 characters!');
        return;
    }
    if(!formData.date){
        setError('Please input a valid date!');
        return;
    }
    if(!amount || Number(amount)<0){
        setError('Please input a valid amount!');
        return;
    }

    const amountNum = Number(amount);
    const finalData = {
      ...formData,
      amount:amountNum
    }
    const response = await AddExpense(finalData);
    if(response?.success){
      setSuccess("Saved Successfully.");
      setFormaData({
        name:"",
        description:"",
        date:""
      })
      setAmount("");
      
    }
    else{
      setError("Something went wrong. Please try again!");
    }

  }



  return (
    <div>
      <Button
        onClick={handleModalOpen}
        className="bg-green-800 text-md text-white hover:bg-green-700 py-5 flex items-center gap-2"
      >
        <Plus />
        Add New Expense
      </Button>

      {/* Modal */}
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Add New Expense"
      >
        {/* Expense Form UI */}
        <div className="space-y-4">
          {/* Name */}
          <div className="flex flex-col space-y-1">
            <label className="text-sm font-medium">Expense Name</label>
            <Input
              value={formData.name}
              onChange={(e) =>
                setFormaData({ ...formData, name: e.target.value })
              }
              placeholder="e.g., Office Rent, Internet Bill"
            />
          </div>

          {/* Description */}
          <div className="flex flex-col space-y-1">
            <label className="text-sm font-medium">Description</label>
            <Textarea
              value={formData.description}
              onChange={(e) =>
                setFormaData({ ...formData, description: e.target.value })
              }
              placeholder="Write a short description..."
              rows={3}
            />
          </div>

          {/* Date Picker */}
          <div className="flex flex-col space-y-1">
            <label className="text-sm font-medium">Date</label>
            <Input
              value={formData.date}
              onChange={(e) =>
                setFormaData({ ...formData, date: e.target.value })
              }
              type="date"
              className="cursor-pointer"
            />
          </div>

          {/* Amount */}
          <div className="flex flex-col space-y-1">
            <label className="text-sm font-medium">Amount (TK)</label>
            <Input
              value={amount}
              onChange={(e) =>
                setAmount(e.target.value )
              }
              type="number"
              placeholder="e.g., 5000"
            />
          </div>

          {/* Error */}
          <div>
            {error && <div className="text-red-500 text-sm">{error}</div>}
            {success && <div className="text-green-500 text-sm">{success}</div>}
          </div>

          {/* Modal Footer */}
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="secondary" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>

            <Button onClick={handleSubmit} className="bg-green-700 hover:bg-green-600">
              Save Expense
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AddExpenseButton;

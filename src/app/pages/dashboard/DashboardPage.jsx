import Modal from "@/components/Modal";
import { useState } from "react";

export default function DashboardPage() {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="container mx-auto mt-10">
      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2 className="text-xl font-bold">Welcome GAIA - SMART</h2>
        <p>We are glad to have you here. Enjoy exploring the dashboard!</p>
      </Modal>

      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p>Welcome to your dashboard!</p>
    </div>
  );
}

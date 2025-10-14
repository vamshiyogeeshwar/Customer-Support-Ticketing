


import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./TicketDialog2.css";
import ticketAPI from "../../services/api";

const TicketDialogContent = ({ ticket, onClose, onTicketUpdated }) => {
  const [comment, setComment] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTicket, setUpdatedTicket] = useState(ticket || {});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setUpdatedTicket(ticket || {});
    console.log('TicketDialog mounted with ticket:', ticket);
    return () => console.log('TicketDialog unmount');
  }, [ticket]);

  const handleInputChange = (e) => {
    setUpdatedTicket({ ...updatedTicket, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      await ticketAPI.updateTicket(updatedTicket);
      onTicketUpdated();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to update ticket.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this ticket?")) return;
    setLoading(true);
    try {
      // If your API method is named deleteTicket
      await ticketAPI.deleteTicket(ticket.id);
      onTicketUpdated();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to delete ticket.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddComment = async () => {
    if (!comment.trim()) return alert("Please enter a comment.");
    setLoading(true);
    try {
      await ticketAPI.addComment(ticket.id, { text: comment });
      setComment("");
      // optionally refresh comments or ticket
    } catch (err) {
      console.error(err);
      alert("Failed to add comment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ticket-dialog-overlay" onClick={onClose}>
      <div className="ticket-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="dialog-header">
          <h3>Ticket Details</h3>
          <button className="close-btn" onClick={onClose}>✖</button>
        </div>

        <div className="dialog-content">
          {isEditing ? (
            <>
              <label>Subject:</label>
              <input type="text" name="subject" value={updatedTicket.subject || ''} onChange={handleInputChange} />
              <label>Status:</label>
              <input type="text" name="status1" value={updatedTicket.status1 || ''} onChange={handleInputChange} />
              <label>Priority:</label>
              <input type="text" name="priority" value={updatedTicket.priority || ''} onChange={handleInputChange} />
              <label>Assignee:</label>
              <input type="text" name="assignee" value={updatedTicket.assignee || ''} onChange={handleInputChange} />
            </>
          ) : (
            <>
              <p><strong>ID:</strong> {ticket.id}</p>
              <p><strong>Subject:</strong> {ticket.subject}</p>
              <p><strong>Status:</strong> {ticket.status1}</p>
              <p><strong>Priority:</strong> {ticket.priority}</p>
              <p><strong>Assignee:</strong> {ticket.assignee}</p>
              <p><strong>Created At:</strong> {ticket.createdAt}</p>
              <p><strong>Updated At:</strong> {ticket.updatedAt}</p>
            </>
          )}
        </div>

        <div className="dialog-footer">
          {isEditing ? (
            <>
              <button className="save-btn" onClick={handleUpdate} disabled={loading}>{loading ? 'Saving...' : 'Save'}</button>
              <button className="cancel-btn" onClick={() => setIsEditing(false)}>Cancel</button>
            </>
          ) : (
            <>
              <button className="edit-btn" onClick={() => setIsEditing(true)}>Edit</button>
              <button className="delete-btn" onClick={handleDelete}>Delete</button>
            </>
          )}
        </div>

        <div className="comment-section">
          <h4>Add Comment</h4>
          <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Write your comment..." />
          <button className="comment-btn" onClick={handleAddComment} disabled={loading}>{loading ? 'Submitting...' : 'Submit Comment'}</button>
        </div>
      </div>
    </div>
  );
};

const TicketDialog = (props) => {
  if (typeof document === 'undefined') return null;
  return ReactDOM.createPortal(<TicketDialogContent {...props} />, document.body);
};

export default TicketDialog;

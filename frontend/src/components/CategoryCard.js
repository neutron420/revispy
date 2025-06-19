import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { MoreVertical } from 'lucide-react';
export const CategoryCard = ({ category, onClick, onEdit, onDelete, }) => {
    const [showMenu, setShowMenu] = React.useState(false);
    const handleMenuClick = (e) => {
        e.stopPropagation();
        setShowMenu(!showMenu);
    };
    const handleEdit = (e) => {
        e.stopPropagation();
        setShowMenu(false);
        onEdit?.();
    };
    const handleDelete = (e) => {
        e.stopPropagation();
        setShowMenu(false);
        onDelete?.();
    };
    return (_jsxs("div", { className: "bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer relative overflow-hidden", onClick: onClick, children: [_jsx("div", { className: "h-1 w-full", style: { backgroundColor: category.color } }), _jsxs("div", { className: "p-6", children: [_jsxs("div", { className: "flex items-start justify-between", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: "w-12 h-12 rounded-lg flex items-center justify-center text-white text-xl font-semibold", style: { backgroundColor: category.color }, children: category.icon || category.name.charAt(0).toUpperCase() }), _jsxs("div", { children: [_jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-1", children: category.name }), _jsx("p", { className: "text-sm text-gray-600 mb-2", children: category.description })] })] }), (onEdit || onDelete) && (_jsxs("div", { className: "relative", children: [_jsx("button", { onClick: handleMenuClick, className: "p-1 rounded-full hover:bg-gray-100 transition-colors", children: _jsx(MoreVertical, { className: "w-5 h-5 text-gray-500" }) }), showMenu && (_jsxs("div", { className: "absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg border border-gray-200 z-10", children: [onEdit && (_jsx("button", { onClick: handleEdit, className: "w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100", children: "Edit" })), onDelete && (_jsx("button", { onClick: handleDelete, className: "w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50", children: "Delete" }))] }))] }))] }), _jsxs("div", { className: "mt-4 flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("span", { className: "text-2xl font-bold text-gray-900", children: category.itemCount }), _jsx("span", { className: "text-sm text-gray-500", children: category.itemCount === 1 ? 'item' : 'items' })] }), _jsx("div", { className: "text-xs text-gray-400", children: "Click to view details" })] })] }), showMenu && (_jsx("div", { className: "fixed inset-0 z-5", onClick: () => setShowMenu(false) }))] }));
};

"use client";

import MessageDeleteDialog from "./message-delete-dialog";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import MessageDialog from "./message-dialog";
import { ArrowUpDown } from "lucide-react";
import { SafeMessage } from "@/types";

export const columns: ColumnDef<SafeMessage>[] = [
	{
		accessorKey: "name",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					className="p-0"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Name
					<ArrowUpDown className="w-4 h-4 ml-2" />
				</Button>
			)
		}
	},
	{
		accessorKey: "email",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					className="p-0"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Email
					<ArrowUpDown className="w-4 h-4 ml-2" />
				</Button>
			)
		}
	},
	{
		accessorKey: "subject",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					className="p-0"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Subject
					<ArrowUpDown className="w-4 h-4 ml-2" />
				</Button>
			)
		}
	},
	{
		accessorKey: "createdAt",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					className="p-0"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Created At
					<ArrowUpDown className="w-4 h-4 ml-2" />
				</Button>
			)
		},
		cell: ({ row }) => {
			const date = new Date(row.original.createdAt);
			const formattedDate = date.toLocaleDateString("bg", {
				day: "numeric",
				month: "short",
				year: "numeric",
			});

			return formattedDate;
		}
	},
	{
		accessorKey: "actions",
		header: "",
		cell: ({ row }) => {
			const message = row.original;

			return (
				<div className="flex items-center space-x-2">
					<MessageDialog message={message} />
					<MessageDeleteDialog message={message} />
				</div>
			)
		}
	},
]
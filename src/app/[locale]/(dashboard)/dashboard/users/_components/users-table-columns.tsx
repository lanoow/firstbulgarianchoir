"use client";

import UserDeleteDialog from "./user-delete-dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import UserDialog from "./user-dialog";
import { SafeUser } from "@/types";
import UserEditDialog from "./user-edit-dialog";

export const columns: ColumnDef<SafeUser>[] = [
	{
		id: "select",
		header: ({ table }) => (
			<Checkbox
				checked={
					table.getIsAllPageRowsSelected() ||
					(table.getIsSomePageRowsSelected() && "indeterminate")
				}
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				aria-label="Select all"
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label="Select row"
			/>
		),
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: "name",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					className="p-0"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Име
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
					Имейл
					<ArrowUpDown className="w-4 h-4 ml-2" />
				</Button>
			)
		}
	},
	{
		accessorKey: "role",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					className="p-0"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Роля
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
					Създаден на
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
			const user = row.original;

			return (
				<div className="flex items-center space-x-2">
					<UserDialog user={user} />
					<UserEditDialog user={user} />
					<UserDeleteDialog user={user} />
				</div>
			)
		}
	},
]
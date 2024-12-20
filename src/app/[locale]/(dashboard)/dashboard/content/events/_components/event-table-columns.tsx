"use client";

import EventDeleteDialog from "./event-delete-dialog";
import { ColumnDef } from "@tanstack/react-table";
import EventEditDialog from "./event-edit-dialog";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Eye } from "lucide-react";
import { SafeEvent } from "@/types";
import Link from "next/link";

export const columns: ColumnDef<SafeEvent>[] = [
	{
		accessorKey: "titleBG",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					className="p-0"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Заглавие
					<ArrowUpDown className="w-4 h-4 ml-2" />
				</Button>
			)
		}
	},
	{
		accessorKey: "locationBG",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					className="p-0"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Локация
					<ArrowUpDown className="w-4 h-4 ml-2" />
				</Button>
			)
		}
	},
	{
		accessorKey: "date",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					className="p-0"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Дата
					<ArrowUpDown className="w-4 h-4 ml-2" />
				</Button>
			)
		},
		cell: ({ row }) => {
			const date = new Date(row.original.date);
			const formattedDate = date.toLocaleDateString("bg", {
				day: "numeric",
				month: "short",
				year: "numeric",
			});

			return formattedDate;
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
					Създадено на
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
			const event = row.original;

			return (
				<div className="flex items-center space-x-2">
					<Link href={`/events/${event.slug}`}>
						<Eye className="size-5 hover:opacity-70 transition" />
					</Link>
					<EventEditDialog event={event} />
					<EventDeleteDialog event={event} />
				</div>
			)
		}
	},
]
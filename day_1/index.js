import { program } from "commander";

import {
  addEntry,
  listEntries,
  editEntry,
  deleteEntry,
} from "./todo-functions.js";

program
  .command("add <entry>")
  .description("Add a to-do entry")
  .action((entry) => {
    addEntry(entry);
  });

program
  .command("list")
  .description("List all entries")
  .option(
    "-s, --status <status>",
    'Change the done status ("to-do" - "in-progress" - "done")'
  )
  .action((options) => {
    const status = options.status;
    listEntries(status);
  });

program
  .command("edit <id> <title>")
  .description("Edit an entry by ID")
  .option(
    "-s, --status <status>",
    'Change the done status ("to-do" - "in-progress" - "done")'
  )
  .action((id, title, options) => {
    const status = options.status;
    editEntry(id, title, status);
  });

program
  .command("delete <id>")
  .description("Delete an entry by ID")
  .action((id) => {
    deleteEntry(id);
  });

program.parse(process.argv);

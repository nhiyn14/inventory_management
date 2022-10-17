#!/usr/bin/python3
"""The Console"""
import cmd
from datetime import datetime
import models
from models.base_model import BaseModel, Base
from models.sales import Sales
from models.sales_detail import SalesDetail
from models.product import Product
from models.user import User
import shlex


classes = {"BaseModel": BaseModel, "Product": Product, "User": User,
           "Sales": Sales, "SalesDetail": SalesDetail}


class ConsoleCommand(cmd.Cmd):
    """The Console"""
    prompt = '(stock_inventory)\n'

    def do_EOF(self, arg):
        """Exits console"""
        return True

    def emptyline(self):
        """Overwriting the emptyline method """
        return False

    def do_quit(self, arg):
        """Quit command to exit the program"""
        return True

    def _key_value_parser(self, args):
        """Creates a dictionary from a list of strings"""
        attributes = ["username", "first_name", "last_name", "email", "password",
                      "product_name", "user_id", "price_wholesale", "price_retail",
                      "product_description", "quatity", "product_status", "user_id",
                      "discount", "order_id", "product_id", "product_discount",
                      "sale_price", "quantity", "revenue", "gross_profit"]
        new_dict = {}
        for arg in args:
            if "=" not in arg:
                return 0
            else:
                kvp = arg.split('=', 1)
                key = kvp[0]
                value = kvp[1]
                if key not in attributes:
                    return 1
                elif value == "":
                    return 2
                else:
                    print (f"key is {key} and value is {value}")
                    if value[0] == value[-1] == '"':
                        value = shlex.split(value)[0].replace('_', ' ')
                    else:
                        try:
                            value = int(value)
                        except:
                            try:
                                value = float(value)
                            except:
                                continue
                    new_dict[key] = value
        return new_dict

    def do_create(self, arg):
        """Creates a new instance of a class"""
        args = arg.split()
        if len(args) == 0:
            print("** class name missing **")
        elif args[0] in classes:
            if len(args) > 1:
                new_dict = self._key_value_parser(args[1:])
                if new_dict == 0:
                    print("** incorrect format for attribute & value **")
                elif new_dict == 1:
                    print("** no attribute found **")
                elif new_dict == 2:
                    print("** missing value **")
                else:
                    instance = classes[args[0]](**new_dict)
                    print(instance.id)
                    instance.save()
            else:
                print("** atrribure & value missing **")
        else:
            print("** class doesn't exist **")

    def do_show(self, arg):
        """Prints an instance as a string based on the class and id"""
        args = shlex.split(arg)
        if len(args) == 0:
            print("** class name missing **")
            return False
        if args[0] in classes:
            if len(args) > 1:
                key = args[0] + "." + args[1]
                if key in models.storage.all():
                    print(models.storage.get(classes[args[0]], args[1]))
                else:
                    print("** no instance found **")
            else:
                print("** instance id missing **")
        else:
            print("** class doesn't exist **")

    def do_destroy(self, arg):
        """Deletes an instance based on the class and id"""
        args = shlex.split(arg)
        if len(args) == 0:
            print("** class name missing **")
        elif args[0] in classes:
            if len(args) > 1:
                key = args[0] + "." + args[1]
                if key in models.storage.all():
                    model = classes[args[0]]
                    models.storage.delete(model, args[1])
                else:
                    print("** no instance found **")
            else:
                print("** instance id missing **")
        else:
            print("** class doesn't exist **")

    def do_all(self, arg):
        """Prints string representations of instances"""
        args = shlex.split(arg)
        obj_list = []
        if len(args) == 0:
            obj_dict = models.storage.all()
        elif args[0] in classes:
            obj_dict = models.storage.all(classes[args[0]])
        else:
            print("** class doesn't exist **")
            return False
        for key in obj_dict:
            obj_list.append(str(obj_dict[key]))
        print("[", end="")
        print(", ".join(obj_list), end="")
        print("]")

    def do_update(self, arg):
        """Update an instance based on the class name, id, attribute & value"""
        args = shlex.split(arg)
        if len(args) == 0:
            print("** class name missing **")
        elif args[0] in classes:
            if len(args) > 1:
                key = args[0] + "." + args[1]
                if key in models.storage.all():
                    if len(args) > 2:
                        if "=" in args[2]:
                            new = args[2].split('=')
                            key_extra = "'" + new[0] + "':"
                            if key_extra in str(models.storage.get(classes[args[0]], args[1])):
                                key = new[0]
                                value = new[1]
                                model = classes[args[0]]
                                models.storage.update(model, args[1], key, value)
                            else:
                                print("** key doesn't exist **")
                        else:
                            print("** incorrect format for attribute & value **")
                    else:
                        print("** atrribure & value missing **")
                else:
                    print("** no instance found **")
            else:
                print("** instance id missing **")
        else:
            print("** class doesn't exist **")

if __name__ == '__main__':
    ConsoleCommand().cmdloop()

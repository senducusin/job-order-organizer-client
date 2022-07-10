import React, { useState } from "react";
import DetailView from "./components/JobOrderDetails/DetailView";
import ListView from "./components/JobOrderList/ListView";
import classes from "./App.module.css";
import SideMenu from "./components/SideMenu/SideMenu";
import PouchDB from "pouchdb";

var db = new PouchDB("jobOrders");

function App() {
  const [accounts, setAccounts] = useState([]);
  const [toShowAccounts, setToShowAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState({});
  const [modeFilter, setModeFilter] = useState("all");
  const [searchKeyword, setSearchKeyword] = useState("");
  const classNames = `App ${classes.container}`;

  const sorted = (array) => {
    let sortedArray = array.sort((a, b) => {
      let fa = a.customer.toLowerCase();
      let fb = b.customer.toLowerCase();

      if (fa < fb) {
        return -1;
      }

      if (fa > fb) {
        return 1;
      }

      return 0;
    });

    return sortedArray;
  };

  const filterAccountsToShow = (withKeyword, withMode, withAccounts) => {
    let filteredAccounts = withAccounts.filter((account) => {
      return (
        account.customer.toLowerCase().includes(withKeyword) ||
        account.accountNumber.toLowerCase().includes(withKeyword)
      );
    });

    switch (withMode) {
      case "in-progress":
        return filteredAccounts.filter((account) => {
          return account.assignments.some((assignment) => {
            return assignment.status.toLowerCase() !== "inspected";
          });
        });

      case "inspected":
        return filteredAccounts.filter((account) => {
          return !account.assignments.some((assignment) => {
            return assignment.status.toLowerCase() !== "inspected";
          });
        });
    }

    return filteredAccounts;
  };

  const searchHandler = (keyword) => {
    setSearchKeyword((prevState) => {
      setToShowAccounts((prevState) => {
        return sorted([...filterAccountsToShow(keyword, modeFilter, accounts)]);
      });

      return keyword;
    });
  };

  const selectHandler = (selectedAccount) => {
    setSelectedAccount(selectedAccount);
  };

  const modeFilterHandler = (mode) => {
    setModeFilter((prevState) => {
      setToShowAccounts((prevState) => {
        let filteredAccounts = sorted([
          ...filterAccountsToShow(searchKeyword, mode, accounts),
        ]);

        let withSelectedAccount = filteredAccounts.some((account) => {
          return account.accountNumber === selectedAccount.accountNumber;
        });

        if (withSelectedAccount === false) {
          selectHandler({});
        }

        return filteredAccounts;
      });

      return mode;
    });
  };

  const addAccountHandler = (account) => {
    db.put({ ...account, _id: account.accountNumber })
      .then(function (response) {
        db.get(response.id).then(function (doc) {
          setAccounts((prevState) => {
            let accounts = [...prevState, doc];

            setToShowAccounts((prevState) => {
              return sorted([
                ...filterAccountsToShow(searchKeyword, modeFilter, accounts),
              ]);
            });

            return sorted(accounts);
          });
        });
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  const updateAccountHandler = (account) => {
    db.get(account._id)
      .then(function (doc) {
        return db.put({ ...doc, assignments: account.assignments });
      })
      .then(function () {
        return db.get(account._id);
      })
      .then(function (doc) {
        setAccounts((prevState) => {
          let accounts = updateAccount(prevState, doc);

          setToShowAccounts((prevState) => {
            let updatedAccounts = updateAccount(prevState, doc);

            return sorted([
              ...filterAccountsToShow(
                searchKeyword,
                modeFilter,
                updatedAccounts
              ),
            ]);
          });

          return accounts;
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateAccount = (prevState, account) => {
    let accounts = prevState.map((prevAccount) => {
      if (account.accountNumber === prevAccount.accountNumber) {
        return account;
      }

      return prevAccount;
    });

    return sorted([...accounts]);
  };

  const importHandler = () => {
    window.api.send("toMain", { mode: "import" });
  };

  const exportHandler = () => {
    let santizedAccounts = accounts.map((account) => {
      delete account._rev;
      delete account._deleted;
      return { ...account };
    });

    window.api.send("toMain", {
      mode: "export",
      content: santizedAccounts,
    });
  };

  const restoreBackup = (data) => {
    // Delete all existing
    db.allDocs({
      include_docs: true,
      attachments: true,
    }).then((result) => {
      let completeAccounts = result.rows.map((row) => {
        return { ...row.doc, _deleted: true };
      });

      db.bulkDocs(completeAccounts, (err, response) => {
        if (err) {
          return console.log(err);
        }

        // Import new data
        let backup = JSON.parse(data.content);
        db.bulkDocs(backup).then((result) => {
          db.allDocs({
            include_docs: true,
            attachments: true,
            cache: false,
          })
            .then((result) => {
              let allAccounts = result.rows.map((row) => {
                return row.doc;
              });

              setAccounts(sorted(allAccounts));
              setToShowAccounts(sorted(allAccounts));
              setSelectedAccount({});
            })
            .catch((err) => {
              console.log(err);
            });
        });
      });
    });
  };

  const loadAllAccounts = () => {
    db.allDocs({
      include_docs: true,
      attachments: true,
      cache: false,
    })
      .then(function (result) {
        let completeAccounts = result.rows.map((row) => {
          return row.doc;
        });

        setAccounts(sorted(completeAccounts));
        setToShowAccounts(sorted(completeAccounts));
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  React.useEffect(() => {
    window.api.receive("fromMain", (data) => {
      switch (data.mode) {
        case "restore":
          restoreBackup(data);
          break;
      }
    });

    loadAllAccounts();
  }, []);

  return (
    <div className={classNames}>
      <SideMenu
        import={importHandler}
        export={exportHandler}
        showAlert={accounts.length > 0}
      />
      <ListView
        selectHandling={selectHandler}
        searchHandler={searchHandler}
        modeFilterHandler={modeFilterHandler}
        modeFilter={modeFilter}
        accounts={toShowAccounts}
        completeAccountList={accounts}
        selectedAccountNumber={selectedAccount.accountNumber}
      />
      <DetailView
        account={selectedAccount}
        addHandler={addAccountHandler}
        accounts={accounts}
        updateHandler={updateAccountHandler}
      />
    </div>
  );
}

export default App;

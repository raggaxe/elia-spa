# Arcadearena

## Run local

### Create local .env

```sh
mv env_sample .env
#add value for empty keys
```

```sh
pip3 install virtualenv
virtualenv venv
source venv/bin/activate
pip3 install -r requirements.txt
./init_local.sh
```

# Run Coverage e report

```sh
py.test --cov-report html tests/* --cov=.
```

# Verify report html

```sh
cd htmlcov && python3 -m http.server
```

- Abra o navegdor com http://0.0.0.0:8000/

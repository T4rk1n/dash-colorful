import dash_colorful
import dash

app = dash.Dash(__name__)

app.layout = dash_colorful.DashColorful(
    id='component',
    value='#222',
    toggleable=True,
)


if __name__ == '__main__':
    app.run_server(debug=True)

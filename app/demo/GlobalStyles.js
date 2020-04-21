import {
  StyleSheet
} from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    padding: 40,
    marginTop: 20
  },
  headerTitle: {
    fontSize: 20,
    marginBottom: 5,
    fontWeight: '600'
  },
  headerSubTitle: {
    fontSize: 15,
    fontWeight: '400'
  },
  body: {
    padding: 20
  },
  bodyContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 200
  },
  button: {
    backgroundColor: '#000',
    width: '50%',
    padding: 15,
    borderRadius: 4,
    marginBottom: 10
  },
  buttonText: {
    fontSize: 14,
    color: '#FFFFFF',
    textAlign: 'center'
  }
})

export default styles;
